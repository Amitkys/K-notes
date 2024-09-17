import axios form 'axios';
axios.get('http://localhost:3000/kys').then((response) => {
    console.log(response);
})