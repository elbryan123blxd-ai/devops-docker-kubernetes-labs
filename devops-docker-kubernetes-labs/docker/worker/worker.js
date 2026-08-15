const INTERVAL = 5000;

console.log("worker started");

setInterval(() => {
  console.log("worker tick", new Date().toISOString());
}, INTERVAL);
