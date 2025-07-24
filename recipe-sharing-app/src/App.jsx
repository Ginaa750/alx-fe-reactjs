import './App.css';
import AddRecipeForm from './store/components/AddRecipeForm';
import RecipeList from './store/components/RecipeList';

function App() {
  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}
export default App;
