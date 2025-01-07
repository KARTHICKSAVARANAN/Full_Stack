// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeForm from './components/RecipeForm';
import RecipeDetails from './components/RecipeDetails';

const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleSelectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleFormSubmit = () => {
    setSelectedRecipe(null);
  };

  return (
    <Router>
      <div>
        <h1>Recipe Manager</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <RecipeList onSelectRecipe={handleSelectRecipe} />
                {selectedRecipe && (
                  <RecipeForm
                    selectedRecipe={selectedRecipe}
                    onFormSubmit={handleFormSubmit}
                  />
                )}
              </>
            }
          />
          <Route path="/details/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
