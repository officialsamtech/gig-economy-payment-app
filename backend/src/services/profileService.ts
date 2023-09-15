// profileService.ts

import * as profileModel from '../models/profileModel';

export const createProfile = async (user_id: number, first_name: string, last_name: string, email: string) => {
    return profileModel.createProfile(user_id, first_name, last_name, email);
};

export const getProfileByUserId = async (user_id: number) => {
    return profileModel.getProfileByUserId(user_id);
};

export const updateProfile = async (user_id: number, first_name: string, last_name: string, email: string) => {
    return profileModel.updateProfile(user_id, first_name, last_name, email);
};
