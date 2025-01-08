import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetail from './components/RecipeDetail';
import Loading from './components/Loading';
import { getRecipes, createRecipe, updateRecipe, deleteRecipe } from './services/api';
import './styles/styles.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await getRecipes();
      setRecipes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recipes');
      setLoading(false);
    }
  };

  const addRecipe = async (recipe) => {
    try {
      const response = await createRecipe(recipe);
      setRecipes([response.data, ...recipes]);
      return true;
    } catch (err) {
      setError('Failed to add recipe');
      return false;
    }
  };

  const handleUpdateRecipe = async (updatedRecipe) => {
    try {
      const response = await updateRecipe(updatedRecipe._id, updatedRecipe);
      setRecipes(recipes.map(recipe => 
        recipe._id === response.data._id ? response.data : recipe
      ));
      setIsEditing(false);
      setCurrentRecipe(null);
      return true;
    } catch (err) {
      setError('Failed to update recipe');
      return false;
    }
  };

  const handleDeleteRecipe = async (id) => {
    try {
      await deleteRecipe(id);
      setRecipes(recipes.filter(recipe => recipe._id !== id));
      return true;
    } catch (err) {
      setError('Failed to delete recipe');
      return false;
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route 
              path="/" 
              element={
                <RecipeList 
                  recipes={recipes}
                  onDelete={handleDeleteRecipe}
                />
              } 
            />
            <Route 
              path="/add" 
              element={
                <RecipeForm 
                  addRecipe={addRecipe}
                />
              } 
            />
            <Route 
              path="/edit/:id" 
              element={
                <RecipeForm 
                  updateRecipe={handleUpdateRecipe}
                  recipes={recipes}
                />
              } 
            />
            <Route 
              path="/recipe/:id" 
              element={
                <RecipeDetail 
                  recipes={recipes}
                  onDelete={handleDeleteRecipe}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 