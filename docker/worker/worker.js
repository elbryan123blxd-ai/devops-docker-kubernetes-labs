const INTERVAL = 5000;

function startWorker() {
  console.log("worker started");
  return setInterval(() => {
    console.log("worker tick", new Date().toISOString());
  }, INTERVAL);
}

if (require.main === module) {
  startWorker();
}

module.exports = { startWorker };
