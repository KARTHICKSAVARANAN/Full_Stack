import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getRecipes = () => axios.get(`${API_URL}/recipes`);
export const createRecipe = (recipe) => axios.post(`${API_URL}/recipes`, recipe);
export const updateRecipe = (id, recipe) => axios.put(`${API_URL}/recipes/${id}`, recipe);
export const deleteRecipe = (id) => axios.delete(`${API_URL}/recipes/${id}`); 