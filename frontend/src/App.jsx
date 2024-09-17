import React, { useEffect, useState } from "react";
import { Try } from "./assets/Components/Try";
import { Navbar } from "./assets/Components/Navbar";
import { Login } from "./assets/Components/Login";
import axios from 'axios';
function App() {
  let [userData, setUserData] = useState([]);
  let [isLogin, setisLogin] = useState(false);

  useEffect(() => {})


  if(isLogin){
    return (
      <>
        <Navbar userData = {userData}></Navbar>
        <a href="http://localhost:3000/auth/google">Login with google</a>
        <h1 className="text-3xl font-bold underline text-blue-500">HI from fornted</h1>
        <Try></Try>
      </>
    )
  } else{
    return (
      <>
        <Login></Login>
      </>
    )
  }

}

export default App;