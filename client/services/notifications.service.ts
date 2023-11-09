import axios from "axios";

const BASE_URL = "http://192.168.1.23:4000/notifications";

export const getNotifications = async (jwt: string) => {
  const response = await axios.get(`${BASE_URL}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
  return response.data;
}