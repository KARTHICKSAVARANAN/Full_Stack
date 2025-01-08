import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RecipeCard({ recipe, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      await onDelete(recipe._id);
    }
  };

  return (
    <Link to={`/recipe/${recipe._id}`} className="recipe-card">
      <h3>{recipe.title}</h3>
      <div className="recipe-details">
        <p><strong>Prep:</strong> {recipe.prepTime} min</p>
        <p><strong>Cook:</strong> {recipe.cookTime} min</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
      </div>
      <div className="recipe-preview">
        <p>{recipe.ingredients.split('\n')[0]}...</p>
      </div>
      <div className="recipe-actions">
        <button 
          onClick={(e) => {
            e.preventDefault();
            navigate(`/edit/${recipe._id}`);
          }} 
          className="edit-btn"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </Link>
  );
}

export default RecipeCard; 