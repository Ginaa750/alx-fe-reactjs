import './App.css'
import WelcomeMessage  from './components/WelcomeMessage'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'  
import UserProfile from './components/UserProfile'
import Counter from './components/Counter'
function App() {
 return (
    <>
    <div>
      <h1 style={{ textAlign: 'center' }}>React Counter App</h1>
      <Counter />
    </div>
    </>
  )
}

export default App
