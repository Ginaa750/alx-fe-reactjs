import './App.css'
import WelcomeMessage  from './components/WelcomeMessage'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'  
import UserProfile from './components/UserProfile'
<<<<<<< HEAD
import Counter from './components/Counter'
function App() {
 return (
    <>
    <div>
      <h1 style={{ textAlign: 'center' }}>React Counter App</h1>
      <Counter />
    </div>
=======
function App() {
 return (
    <>
    <Header />
    <MainContent />
    <WelcomeMessage />
    <UserProfile 
    name="Alice"
    age="25"
    bio="Loves hiking and photography"
    />
    <Footer />

    
>>>>>>> 71a6c10 (Add corrections)
    </>
  )
}

export default App
