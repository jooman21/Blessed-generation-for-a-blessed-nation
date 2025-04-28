import axios from "axios";

// Use the same base URL as the frontend service
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

async function testApiConnection() {
  console.log(`Attempting to connect to backend at: ${baseURL}`);
  try {
    const response = await axios.get(`${baseURL}/health`);
    console.log("Connection successful!");
    console.log("Response data:", response.data);
    process.exit(0); // Exit with success code
  } catch (error) {
    console.error("Connection failed:");
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }
    process.exit(1); // Exit with failure code
  }
}

testApiConnection();

