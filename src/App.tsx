import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar } from './components/view/navbar';
import { SearchBar } from './components/recipe_calc/SearchBar';
import { RecipeCalcPage } from './components/recipe_calc';

function App() {
  return (
    <div className="App">
      <RecipeCalcPage />
    </div>
  );
}

export default App;
