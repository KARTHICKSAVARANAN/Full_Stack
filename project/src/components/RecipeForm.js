import React, { useState } from 'react';
import { createRecipe, updateRecipe } from '../services/api';

const RecipeForm = ({ selectedRecipe, onFormSubmit }) => {
  const [recipe, setRecipe] = useState(selectedRecipe || { name: '', ingredients: '', steps: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipe.id) {
      await updateRecipe(recipe.id, recipe);
    } else {
      await createRecipe(recipe);
    }
    onFormSubmit();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={recipe.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients"
        value={recipe.ingredients}
        onChange={handleChange}
        required
      ></textarea>
      <textarea
        name="steps"
        placeholder="Steps"
        value={recipe.steps}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">{recipe.id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default RecipeForm;
