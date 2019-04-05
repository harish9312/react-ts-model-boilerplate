import { get } from "../utils/HTTP";
import { UserModel } from '../models/UserModel';

export async function getUserData() {
    try {
        const response = await get('https://api.github.com/users');
        (response.data || []).forEach(userInstance => {
            new UserModel(userInstance).$save();
        });
        return response;
    } catch (error) {
        throw error;
    }
}