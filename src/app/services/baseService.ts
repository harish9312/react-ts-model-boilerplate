import { get } from "../utils/HTTP";
import { UserModel } from '../models/UserModel';
import { PostModel } from "app/models/PostModel";

/**
 * Calls the GitHub API and stores the user details in the UserModel instances.
 * @export
 * @returns
 */
export async function getUserData() {
    try {
        const response = await get('https://api.github.com/users');
        (response.data || []).forEach(userInstance => {
            new UserModel(userInstance).$save();
        });
        //TODO: we can use saveAll here instead of saving single single instances.
        return response;
    } catch (error) {
        throw error;
    }
}


/**
 * Calls the jsonplaceholder posts api and stores the posts data in the model.
 * @export
 */
export async function getPostData() {
    try {
        const response = await get('https://jsonplaceholder.typicode.com/posts');
        (response.data || []).forEach(element => {
            new PostModel(element).$save();
        });
    } catch (error) {
        throw error;
    }
}``