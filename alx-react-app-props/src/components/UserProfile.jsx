<<<<<<< HEAD
const UserProfile = (props) => {
   return (
     <div>
       <h2>{props.name}</h2>
       <p>Age: {props.age}</p>
       <p>Bio: {props.bio}</p>
     </div>
   );
 };
export default UserProfile;
=======
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function UserProfile() {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;
>>>>>>> de6ab392cd8a7088a1088d41893e0fe8916000ba
