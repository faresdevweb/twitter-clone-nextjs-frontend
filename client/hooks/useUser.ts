import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';

type User = {
    id: number;
    username: string;
    profileImage: string;
}

export const useUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated) {
            getAllUsers();
        }
    }, [isAuthenticated])

    const getAllUsers = async () => {
        try {
            const response = await fetch('http://192.168.1.25:4000/user');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    return { users };
};
