// src/api/postApi.js
import axios from 'axios';

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL;

export const fetchPosts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};

export const fetchPostById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching post ${id}:`, error);
        throw error;
    }
};

export const createPost = async (postData) => {
    try {
        // Note: The backend POST route needs to be implemented to handle this
        const response = await axios.post(API_URL, postData);
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};