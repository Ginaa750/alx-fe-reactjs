import './App.css'
import WelcomeMessage  from './components/WelcomeMessage'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'  
import UserProfile from './components/UserProfile'
function App() {
 return (
    <>
    <Header />
    <MainContent />
    <WelcomeMessage />
    <UserProfile 
    name="Ginna"
    age="31"
    bio="Gina Godwin is a front-end developer and UX/UI designer passionate about creating intuitive, user-friendly digital experiences. "
    />
    <Footer />

    
    </>
  )
}

export default App
