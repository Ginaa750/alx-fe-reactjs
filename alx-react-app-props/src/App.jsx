<<<<<<< HEAD
import ProfilePage from './ProfilePage';
import UserContext from './UserContext';
=======
import React from 'react';
import UserProfile from './components/UserProfile';
import { UserContext } from './components/UserContext';
>>>>>>> de6ab392cd8a7088a1088d41893e0fe8916000ba

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <UserContext.Provider value={userData}>
<<<<<<< HEAD
      <ProfilePage />
=======
      <UserProfile />
>>>>>>> de6ab392cd8a7088a1088d41893e0fe8916000ba
    </UserContext.Provider>
  );
}

<<<<<<< HEAD
export default App
=======
export default App;

>>>>>>> de6ab392cd8a7088a1088d41893e0fe8916000ba
