import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetail({ recipes, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find(r => r._id === id);

  if (!recipe) {
    return <div className="error">Recipe not found</div>;
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const success = await onDelete(recipe._id);
      if (success) {
        navigate('/');
      }
    }
  };

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      <div className="recipe-info">
        <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
        <p><strong>Cooking Time:</strong> {recipe.cookTime} minutes</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
      </div>
      
      <div className="recipe-section">
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {recipe.ingredients.split('\n').map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="recipe-section">
        <h3>Instructions</h3>
        <ol className="instructions-list">
          {recipe.instructions.split('\n').map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      <div className="recipe-actions">
        <button 
          onClick={() => navigate(`/edit/${recipe._id}`)}
          className="edit-btn"
        >
          Edit Recipe
        </button>
        <button 
          onClick={handleDelete}
          className="delete-btn"
        >
          Delete Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeDetail; 