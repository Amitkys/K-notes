import React, { useEffect } from "react";
import { Try } from "./assets/Components/Try";
import { Navbar } from "./assets/Components/Navbar";
import axios from 'axios';
function App() {
  useEffect(() => {
    
  }, []);
  return (
    <>
    <Navbar></Navbar>
      <h1 className="text-3xl font-bold underline text-blue-500">HI from fornted</h1>
      <Try></Try>
    </>
  )
}

export default App;