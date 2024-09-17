import React, { useEffect, useState } from "react";
import { Try } from "./assets/Components/Try";
import { Navbar } from "./assets/Components/Navbar";
import axios from 'axios';
function App() {
  let [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/kys')
  .then((response) => {
    setUserData(response.data);
  });
  }, []);
  
  

  return (
    <>
    <Navbar userData = {userData}></Navbar>
      <h1 className="text-3xl font-bold underline text-blue-500">HI from fornted</h1>
      <Try></Try>
    </>
  )
}

export default App;