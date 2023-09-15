import * as userModel from '../models/userModel';
export const getAllUsers = async () => {
    return userModel.getAllUsers();
};