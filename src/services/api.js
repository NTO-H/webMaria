// api.js
import { USERS_ENDPOINT } from './routes';

export const getUsers = async () => {
    try {
        const response = await fetch(USERS_ENDPOINT);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};
