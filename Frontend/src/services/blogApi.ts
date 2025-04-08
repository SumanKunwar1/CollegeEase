import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getBlogPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/blog`);
  return response.data.data;
};

export const getBlogPost = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/blog/${id}`);
  return response.data.data;
};

export const createBlogPost = async (postData: any) => {
  const response = await axios.post(`${API_BASE_URL}/blog`, postData);
  return response.data.data;
};

export const updateBlogPost = async (id: string, postData: any) => {
  const response = await axios.put(`${API_BASE_URL}/blog/${id}`, postData);
  return response.data.data;
};

export const deleteBlogPost = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/blog/${id}`);
};