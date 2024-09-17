const name = 'amit k ysyadav';

function nameShorter(name) {
    let words = name.split(" ");
    let newName = words[0]; // Take the first word
    
    if(newName.length > 5) {
        // If the first word is longer than 5 characters, shorten it
        newName = newName.slice(0, 5);
    }
    
    return `${newName}..`;
}

console.log(nameShorter(name)); // Output: amit..
