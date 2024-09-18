import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {

  const [note, setNote] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/note')
    .then((res) => {
      // console.log(res.data.all_note);
      setNote(res.data.all_note);
    })
  }, [])


  return (
    <div>
      <h1>This is react app</h1>
      <AllNotes notes={note}></AllNotes>
    </div>
    
  )
}



function AllNotes({ notes }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  return (
    <div>
      <div className='w-full grid grid-cols-3' style={{ gridTemplateColumns: '1fr 4fr 1fr' }}>
        <div className='bg-red-500'>Left Column</div>
        <div className='bg-green-500'>Middle Column</div>
        <div className='bg-blue-500'>Right Column</div>
      </div>
      <div className='mt-4'>
        {notes.map(note => (
          <div key={note._id} className='grid grid-cols-3' style={{ gridTemplateColumns: '1fr 4fr 1fr' }}>
            <div className='bg-red-500 p-2'>{formatDate(note.date)}</div>
            <div className='bg-green-500 p-2'>{note.title}</div>
            <div className='bg-blue-500 p-2 text-center'>
              <button onClick={() => useEffect(()=> {
                axios.get()
              }, [])} className='btn btn-xs'>more</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



function ViewNote(){
  return(
    <div>

    </div>
  )
}

export default App;