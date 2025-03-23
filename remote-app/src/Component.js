import { init } from "@module-federation/runtime";
import {capitalize} from "lodash";
// Initial state
let apiData = { title: "Loading..." };
let error = null;

/**
 * Load axios from shared scope and make a test API call
 */
const loadAxios = async () => {
  try {
    // Initialize the shared scope
    await init("default");
    
    // Try to get axios from the shared scope
    const axios = (await import("axios")).default;
    console.log("Remote: Using shared axios");
    
    // Make a test API call to JSONPlaceholder
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/2");
    apiData = response.data;
    
    // Update the DOM if the component is already rendered
    updateDomElement();
  } catch (err) {
    console.error("Remote: Failed to load/use axios:", err);
    error = err.message;
    updateDomElement();
  }
};

/**
 * Update the DOM element with API data or error
 */
const updateDomElement = () => {
  const dataElement = document.getElementById('remote-api-data');
  if (dataElement) {
    dataElement.textContent = error 
      ? `Error: ${error}` 
      : JSON.stringify(apiData, null, 2);
  }
};

// Initialize immediately
loadAxios();

/**
 * Remote component that displays API data fetched using shared axios
 */
export default () => {
  // Update DOM after a small delay to ensure the element exists
  setTimeout(updateDomElement, 100);
  
  return `
    <div style="padding: 20px; border: 2px solid #3498db; border-radius: 8px; margin-top: 20px;">
      <h2 style="color: #3498db;">Remote App Component</h2>
      <p>This component is loaded from the remote app and uses axios from the host app.</p>
      <h3>API Data (from JSONPlaceholder):</h3>
      <pre id="remote-api-data" style="background-color: #f8f9fa; padding: 10px; border-radius: 4px;">
        ${error ? `Error: ${error}` : JSON.stringify(apiData, null, 2)}
        ${capitalize("chaithra")}
      </pre>
    </div>
  `;
};
