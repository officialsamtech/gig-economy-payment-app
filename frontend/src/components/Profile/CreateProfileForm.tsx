// pages/create-profile.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProfile } from '@/utils/api';  // Import your API function

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
};

const CreateProfileForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        console.log("Submitting form", data);  // Debug log
        const { firstName, lastName, email } = data;
        const userId = localStorage.getItem('userId');
        if (userId) {
            try {
                const result = await createProfile(Number(userId), firstName, lastName, email);
                console.log("API response", result);  // Debug log
                if (result) {
                    // Refresh the profile page
                    window.location.href = '/profile';
                }
            } catch (error) {
                console.error("API call failed", error);  // Debug log
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex max-w-md flex-col my-8 gap-4 h-screen'>
            <div>
                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                <input
                    className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                    {...register("firstName", { required: 'First name is required' })}
                />
                {errors.firstName && <small className='text-red-400'>{errors.firstName.message}</small>}
            </div>
            <div>
                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
                <input
                    {...register("lastName", { required: 'Last name is required' })}
                    className='g-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                />
                {errors.lastName && <small className='text-red-400'>{errors.lastName.message}</small>}
            </div>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                    {...register("email", {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />
                {errors.email && <small className='text-red-400'>{errors.email.message}</small>}
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-2/5 mr-auto px-5 py-2.5 text-center"
            >
                {loading ? 'Creating...' : 'Create Profile'}
            </button>
        </form>
    );
};

export default CreateProfileForm;
