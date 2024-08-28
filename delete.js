const time = new Date('2024-08-28T18:06:23.375Z');

// Format the date as "28 Aug 2024"
const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
const formattedDate = time.toLocaleDateString('en-GB', optionsDate);

// Format the time as "11:36PM"
const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
const formattedTime = time.toLocaleTimeString('en-US', optionsTime).replace(' ', '');

// Combine both date and time
const formattedDateTime = `${formattedDate}, ${formattedTime}`;

console.log(formattedDateTime);

