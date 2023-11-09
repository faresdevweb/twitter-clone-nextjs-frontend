import axios from "axios";

const BASE_URL = "http://192.168.1.23:4000/user/current-user";

export const getCurrentUser = async (token: string) => {
  const response = axios.get(`${BASE_URL}`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });
  return (await response).data;
}