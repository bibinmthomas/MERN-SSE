import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState({ value: 0 });

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/data-stream");

    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Data Value from Server:</h1>
      <p>
        {" "}
        <strong>{data.value}</strong>{" "}
      </p>
    </div>
  );
}

export default App;
