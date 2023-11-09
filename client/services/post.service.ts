import { Post } from '@/interfaces/Post.interface';
import axios from 'axios';

const BASE_URL = 'http://192.168.1.23:4000/posts'


export const getPostById = async (postId: string, jwt: string): Promise<Post> => {
  const response = await axios.get(`${BASE_URL}/get-single-post/${postId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data;
}

export const getPosts = async (page: unknown, limit: number, jwt: string) => {
  const response = await axios.get(`${BASE_URL}?page=${page}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data;
};

export const createPost = async (message: string, jwt: string): Promise<Post> => {
  const response = await axios.post(`${BASE_URL}/createPost`, {
    body: message,
  }, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.data;
}

export const likePost = async (postId: string, jwt: string): Promise<Post> => {
  const reponse = await axios.post(`${BASE_URL}/${postId}/likePost`, {} ,{
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return reponse.data;
}

export const repostPost = async (postId: string, jwt: string) => {
  const reponse = await axios.post(`${BASE_URL}/${postId}/repostPost`, {} , {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    }
  );
  return reponse.data;
}