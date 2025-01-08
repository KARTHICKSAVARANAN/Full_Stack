import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function RecipeForm({ addRecipe, updateRecipe, recipes }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const initialFormState = {
    title: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    ingredients: '',
    instructions: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (isEditing && recipes) {
      const recipe = recipes.find(r => r._id === id);
      if (recipe) {
        setFormData(recipe);
      }
    }
  }, [isEditing, id, recipes]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = isEditing 
      ? await updateRecipe(formData)
      : await addRecipe(formData);
    
    if (success) {
      navigate('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>{isEditing ? 'Edit Recipe' : 'Add New Recipe'}</h2>
      
      <div className="form-group">
        <label htmlFor="title">Recipe Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="prepTime">Prep Time (minutes):</label>
          <input
            type="number"
            id="prepTime"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cookTime">Cook Time (minutes):</label>
          <input
            type="number"
            id="cookTime"
            name="cookTime"
            value={formData.cookTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="servings">Servings:</label>
          <input
            type="number"
            id="servings"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">Ingredients (one per line):</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
          placeholder="2 cups flour&#10;1 cup sugar&#10;2 eggs"
        />
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions (one step per line):</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          placeholder="Mix dry ingredients&#10;Add wet ingredients&#10;Bake at 350°F"
        />
      </div>

      <button type="submit" className="submit-btn">
        {isEditing ? 'Update Recipe' : 'Add Recipe'}
      </button>
    </form>
  );
}

export default RecipeForm; 