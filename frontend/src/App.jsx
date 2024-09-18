import React, { useEffect, useState } from "react";
import { Try } from "./assets/Components/Try";
import { Navbar } from "./assets/Components/Navbar";
import axios from 'axios';

function App() {
  let [userData, setUserData] = useState(null);
  let [isLogin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // console.log('use effect is called')
    axios.get('http://localhost:3000/user', { withCredentials: true })
      .then((res) => {
        // console.log(res.data.user)
        if (res.data.user) {
          setIsLoggedIn(true);
          setUserData(res.data.user);
        }
      }).catch(() => {
        setIsLoggedIn(false);
      });
  }, []);
  

  

  // Conditionally render based on login state
  if (isLogin) {
    return (
      <>
        <Navbar userData={userData}></Navbar>
        <h1 className="text-3xl font-bold underline text-blue-500">HI from frontend</h1>
        <Try></Try>
      </>
    );
  } else {
    return (
      <>
        <a className="underline" href="http://localhost:3000/auth/google">Login with Google</a>
      </>
    );
  }
}

export default App;
