import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/recipes'; // Update this with your backend URL

export const getRecipes = async () => axios.get(API_BASE_URL);
export const getRecipeById = async (id) => axios.get(`${API_BASE_URL}/${id}`);
export const createRecipe = async (data) => axios.post(API_BASE_URL, data);
export const updateRecipe = async (id, data) => axios.put(`${API_BASE_URL}/${id}`, data);
export const deleteRecipe = async (id) => axios.delete(`${API_BASE_URL}/${id}`);

