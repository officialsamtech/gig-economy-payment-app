// pages/profile.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProfile } from '@/utils/api'
import MainLayout from '@/layouts/MainLayout';
import CreateProfileForm from '@/components/Profile/CreateProfileForm';

const Profile = () => {
    const [profile, setProfile] = useState<{ id: number, first_name: string, last_name: string, email: string } | null>(null);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const result = await getProfile();
                if (result) {
                    setProfile(result);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            }
        };
        fetchProfile();
    }, []);


    return (
        <MainLayout>
            <div>
                {profile && (profile.first_name || profile.last_name || profile.email) ? (
                    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {`${profile.first_name || ''} ${profile.last_name || ''}`}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            {profile.email || 'Email not set'}
                        </p>
                        {/* <button onClick=Function to show EditProfileForm>Edit Profile</button> */}
                    </div>
                ) : (
                    <div className=''>
                        <p>You don't have a profile yet.</p>
                        <CreateProfileForm />
                    </div>
                )}

            </div>
        </MainLayout>
    );
};

export default Profile;
