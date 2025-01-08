import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onDelete }) {
  if (recipes.length === 0) {
    return (
      <div className="empty-state">
        <p>No recipes added yet.</p>
        <Link to="/add" className="add-recipe-btn">
          Add Your First Recipe
        </Link>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default RecipeList; 