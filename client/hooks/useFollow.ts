import { useCookies } from "react-cookie";


export const useFollow = () => {

    const [cookies] = useCookies(["token"]);

    const follow = async (userId: string) => {
        try {
            const response = await fetch(`http://192.168.1.25:4000/follow/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${cookies.token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { follow };
};
