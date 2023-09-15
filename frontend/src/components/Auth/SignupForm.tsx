import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signup } from '@/utils/api';
import router from 'next/router';
import Link from 'next/link';

type SignupFormData = {
    username: string;
    password: string;
};

const SignupForm = (): JSX.Element => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    const onSubmit: SubmitHandler<SignupFormData> = async (data: SignupFormData) => {
        console.log(data);
        setLoading(true);
        setApiError(null);

        try {
            const result = await signup(data.username, data.password);  // Make sure to await here
            if (result.user && result.token) {
                // Navigate to signin or show a success message
                router.push('/auth/signin');
            } else {
                setApiError(result.message || 'An error occurred from API');
            }
        } catch (error) {
            setApiError('An error occurred from somewhere else');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className='flex max-w-md flex-col mx-auto gap-4 place-content-center' onSubmit={handleSubmit(onSubmit)}>
            {/* Register */}

            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                Username
                <input
                    type="text"
                    {...register("username", { required: true })}
                    className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                />
            </label>
            {errors.username && <p>Username is required</p>}

            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-90">
                Password
                <input
                    type="password"
                    {...register("password", { required: true })}
                    className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                />
            </label>
            {errors.password && <p>Password is required</p>}

            {apiError && <p className="text-red-500 text-2xl">{apiError}</p>}

            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/4 mx-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            {/* Already have an account, sign in */}
            <div className="flex justify-center mt-4">
                <p className="text-sm font-medium text-gray-900 ">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-700 hover:text-blue-800 ">
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default SignupForm;
