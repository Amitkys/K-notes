// about date and time 
/*
const date = new Date();
const formattedDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

console.log(date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short'  }));
// Example output: "Sep 18"


console.log(formattedDate); // Output: "18 Sep 2024"


// learn more: https://chatgpt.com/share/66ea29f3-c0f4-8012-b74f-f932f30b07bb
*/


const date = new Date('2024-09-18T02:24:15.145Z');

console.log(date.getMinutes());