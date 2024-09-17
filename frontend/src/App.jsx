import React, { useEffect } from "react";
import { Try } from "./assets/Components/Try";
import { Navbar } from "./assets/Components/Navbar";
import axios from 'axios';
function App() {
  
  axios.get('http://localhost:3000/kys')
  .then((response) => console.log(response.data.msg));

  return (
    <>
    <Navbar></Navbar>
      <h1 className="text-3xl font-bold underline text-blue-500">HI from fornted</h1>
      <Try></Try>
    </>
  )
}

export default App;