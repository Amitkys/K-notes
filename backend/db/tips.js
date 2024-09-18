// if i have to search a day in db 
const startOfDay = new Date('2024-05-04T00:00:00Z'); // Midnight of the day
const endOfDay = new Date('2024-05-04T23:59:59Z'); // End of the day

db.collection.find({
  createdAt: {
    $gte: startOfDay,  // Greater than or equal to start of the day
    $lt: endOfDay      // Less than the start of the next day
  }
});
