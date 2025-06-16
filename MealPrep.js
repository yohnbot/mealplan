import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Search, ChefHat, Package, Refrigerator } from 'lucide-react';

export default function MealPrepApp() {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: 'Chicken breast', category: 'fridge', quantity: '2 pieces' },
    { id: 2, name: 'Rice', category: 'pantry', quantity: '1 kg' },
    { id: 3, name: 'Onions', category: 'pantry', quantity: '3 pieces' }
  ]);
  const [newIngredient, setNewIngredient] = useState({ name: '', category: 'fridge', quantity: '' });
  const [recipes, setRecipes] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');

  const addIngredient = () => {
    if (newIngredient.name.trim()) {
      const ingredient = {
        id: Date.now(),
        name: newIngredient.name.trim(),
        category: newIngredient.category,
        quantity: newIngredient.quantity.trim() || '1'
      };
      setIngredients([...ingredients, ingredient]);
      setNewIngredient({ name: '', category: 'fridge', quantity: '' });
    }
  };

  const deleteIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const searchRecipes = async () => {
    setIsSearching(true);
    const ingredientNames = ingredients.map(ing => ing.name).join(', ');
    
    // Simulated recipe search - in a real app, you'd call an API
    setTimeout(() => {
      const mockRecipes = [
        {
          id: 1,
          title: 'Chicken Fried Rice',
          ingredients: ['chicken breast', 'rice', 'onions'],
          cookTime: '25 mins',
          difficulty: 'Easy',
          image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300&h=200&fit=crop'
        },
        {
          id: 2,
          title: 'Chicken and Onion Stir Fry',
          ingredients: ['chicken breast', 'onions'],
          cookTime: '15 mins',
          difficulty: 'Easy',
          image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop'
        },
        {
          id: 3,
          title: 'Simple Chicken Rice Bowl',
          ingredients: ['chicken breast', 'rice'],
          cookTime: '20 mins',
          difficulty: 'Easy',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop'
        }
      ];
      setRecipes(mockRecipes);
      setIsSearching(false);
      setActiveTab('recipes');
    }, 1500);
  };

  const fridgeItems = ingredients.filter(ing => ing.category === 'fridge');
  const pantryItems = ingredients.filter(ing => ing.category === 'pantry');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Meal Prep Assistant</h1>
          </div>
          <p className="text-gray-600">Track your ingredients and discover recipes you can make</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white rounded-lg shadow-sm mb-6 p-1">
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'ingredients'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              activeTab === 'recipes'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Recipes
          </button>
        </div>

        {activeTab === 'ingredients' && (
          <div className="space-y-6">
            {/* Add Ingredient Form */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Ingredient</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Ingredient name"
                  value={newIngredient.name}
                  onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <select
                  value={newIngredient.category}
                  onChange={(e) => setNewIngredient({...newIngredient, category: e.target.value})}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="fridge">Fridge</option>
                  <option value="pantry">Pantry</option>
                </select>
                <input
                  type="text"
                  placeholder="Quantity (optional)"
                  value={newIngredient.quantity}
                  onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={addIngredient}
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </button>
              </div>
            </div>

            {/* Ingredient Lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fridge Items */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Refrigerator className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Fridge ({fridgeItems.length})</h3>
                </div>
                <div className="space-y-2">
                  {fridgeItems.map(ingredient => (
                    <div key={ingredient.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{ingredient.name}</div>
                        <div className="text-sm text-gray-600">{ingredient.quantity}</div>
                      </div>
                      <button
                        onClick={() => deleteIngredient(ingredient.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {fridgeItems.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No fridge items yet</p>
                  )}
                </div>
              </div>

              {/* Pantry Items */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Package className="w-5 h-5 text-orange-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-800">Pantry ({pantryItems.length})</h3>
                </div>
                <div className="space-y-2">
                  {pantryItems.map(ingredient => (
                    <div key={ingredient.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-800">{ingredient.name}</div>
                        <div className="text-sm text-gray-600">{ingredient.quantity}</div>
                      </div>
                      <button
                        onClick={() => deleteIngredient(ingredient.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {pantryItems.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No pantry items yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Search Recipes Button */}
            {ingredients.length > 0 && (
              <div className="text-center">
                <button
                  onClick={searchRecipes}
                  disabled={isSearching}
                  className="bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700 transition-colors text-lg font-medium disabled:opacity-50"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></div>
                      Finding Recipes...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 inline mr-2" />
                      Find Recipes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'recipes' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Recipe Recommendations</h2>
              <p className="text-gray-600">Based on your available ingredients</p>
            </div>

            {recipes.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No recipes found yet</p>
                <p className="text-gray-400">Add some ingredients and click "Find Recipes" to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map(recipe => (
                  <div key={recipe.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">
                          {recipe.difficulty}
                        </span>
                        <span>{recipe.cookTime}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Uses:</strong> {recipe.ingredients.join(', ')}
                      </div>
                      <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        View Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
