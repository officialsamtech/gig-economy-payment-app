import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signin } from '@/utils/api';
import router from 'next/router';
import Link from 'next/link';

type LoginFormData = {
    username: string;
    password: string;
};

const LoginForm = (): JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
        console.log(data);
        setLoading(true);
        setApiError(null);

        try {
            const result = await signin(data.username, data.password);  // Make sure to await here
            if (result.user && result.token) {
                // Navigate to dashboard or show a success message
                router.push('/profile');
            } else {
                setApiError(result.message || 'Username/password is incorrect');
            }
        } catch (error) {
            setApiError('An error occurred from somewhere else');
        } finally {
            setLoading(false);
        }
    };
    return (
        <form className='flex max-w-md flex-col mx-auto gap-4 place-content-center' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
                <input
                    type="text"
                    {...register("username", { required: true })}
                    className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
            </label>
            {errors.username && <small className="text-red-500 text-sm">Username is required</small>}

            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
                <input
                    type="password"
                    {...register("password", { required: true })}
                    className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
            </label>
            {errors.password && <small className="text-red-500 text-sm">Password is required</small>}

            {apiError && <small className="text-red-500 text-sm">{apiError}</small>}

            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/4 mx-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {loading ? 'Signing In...' : 'Log In'}
            </button>
            {/* Haven't registered? Create an account */}
            <p className="text-center text-gray-500 text-sm">
                Haven't registered? <Link href="/auth/signup" className="text-blue-700 hover:text-blue-800">Create an account</Link>
            </p>
        </form>
    );
};

export default LoginForm;
