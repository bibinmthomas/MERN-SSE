const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

// Simulated data update function
function fetchData() {
  // Replace this with your logic to fetch data from API or any other source
  return { value: Math.random() };
}

// Server-Sent Events route
app.get("/data-stream", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  // Send data at fixed intervals
  const interval = setInterval(() => {
    const data = fetchData();
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 1000); // Change the interval (in milliseconds) as per your requirement

  // Close the connection if the client closes it
  req.on("close", () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
