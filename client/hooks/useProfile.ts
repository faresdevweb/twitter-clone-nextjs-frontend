import { useState } from "react";
import { useCookies } from "react-cookie"


export const useProfile = () => {
    const [ cookie ] = useCookies(['token']);
    const [ error, setError ] = useState<string>('');

    const editProfile = async (userData: any) => {
        try {
            const formData = new FormData();

            for (const key in userData) {
                if (userData[key] instanceof FileList) {
                    [...userData[key]].forEach(file => {
                        formData.append(key, file);
                    });
                } else if (userData[key] !== null && userData[key] !== undefined) {
                    formData.append(key, userData[key]);
                }
            }

            const response = await fetch('http://192.168.1.23:4000/profile/editProfile', {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${cookie.token}`
                },
                body: formData 
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const result = await response.json();
            console.log(result);
        } catch (error: any) {
            console.log(error);
            setError(error.message);
        }
    };


    return { editProfile, error }
}