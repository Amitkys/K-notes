import axios from 'axios';
import { useEffect } from 'react';
function App() {

  useEffect(() => {
    axios.get('http://localhost:3000/note')
    .then((res) => {
      console.log(res.data.all_note);
    })
  }, [])


  return (
    <h1>This is react app</h1>
  )
}

export default App;