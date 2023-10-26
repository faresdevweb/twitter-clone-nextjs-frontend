import { useCookies } from "react-cookie"


export const useProfile = () => {
    const [ cookie ] = useCookies(['token']);


    const editProfile = async (userData: any) => {
    try {
        const formData = new FormData();

        // Ajouter les fichiers et les autres champs au formData
        for (const key in userData) {
            if (userData[key] instanceof FileList) {
                // Si c'est un FileList (pour les champs de type 'file'), ajoutez tous les fichiers
                [...userData[key]].forEach(file => {
                    formData.append(key, file);
                });
            } else if (userData[key] !== null && userData[key] !== undefined) {
                // Pour les autres champs, ajoutez-les directement
                formData.append(key, userData[key]);
            }
        }

        const response = await fetch('http://192.168.1.25:4000/profile/edit', {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${cookie.token}`
            },
            body: formData // Utilisez formData ici au lieu de JSON.stringify
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};


    return { editProfile }
}