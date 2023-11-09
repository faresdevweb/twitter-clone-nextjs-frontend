import { User } from "@/interfaces/User.interface";
import axios from "axios";

const BASE_URL = "http://192.168.1.23:4000/auth";

export interface MutationResponse {
  access_token?: string;
  message?: string;
}

export const registerUser = async (userData: User): Promise<MutationResponse> => {
  const response = axios.post(`${BASE_URL}/signup`, userData);
  return { access_token: (await response).data.access_token };
}

export const loginUser = async (userData: User) => {
  const response = axios.post(`${BASE_URL}/signin`, userData);
  return { access_token: (await response).data.access_token };
}