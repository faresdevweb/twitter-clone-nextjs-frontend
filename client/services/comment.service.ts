import axios from "axios";

const BASE_URL = 'http://192.168.1.23:4000/comments';

export const getComments = async (postId: string, jwt: string) => {
  const response = await axios.get(`${BASE_URL}/${postId}`, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
  return response.data;
}

export const addComment = async (postId: string, content: string, jwt: string) => {
  const response = await axios.post(`${BASE_URL}/${postId}/createComment`, { body: content }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`
    }
  });
  return response.data;

}


export const likeComment = async (commentId: string, jwt: string) => {
  const response = await axios.post(`${BASE_URL}/${commentId}/likeComment`, {}, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
  return response.data;
}

export const repostComment = async (commentId: string, jwt: string) => {
  const response = await axios.post(`${BASE_URL}/${commentId}/repostComment`, {}, {
    headers: {
      "Authorization": `Bearer ${jwt}`
    }
  });
  return response.data;
}