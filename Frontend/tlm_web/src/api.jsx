import React, { useState } from "react";

function BackendButtonPage() {
  const [response, setResponse] = useState("brooo");

  const handleBackendCall = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/home"); // Replace with your backend URL
      const data = await res.json();
      setResponse(data.message   || "Success!");
    } catch (error) {
      setResponse(error.message+"Error: Unable to fetch data");
    }
  };

  return (
    <div>
      <h1>Backend Button Page</h1>
      <button onClick={handleBackendCall}>Call Backend</button>
      <p>{response}</p>
    </div>
  );
}

export default BackendButtonPage;