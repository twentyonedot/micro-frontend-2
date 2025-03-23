import axios from "axios";
import { init as initFederation } from "@module-federation/runtime";

/**
 * Initialize the Module Federation shared scope
 */
const initializeSharedScope = async () => {
  await initFederation("default");
  
  // Make axios available globally (helps with debugging)
  window.axios = axios;
};

/**
 * Create the basic UI for the host app
 */
const renderHostApp = () => {
  document.getElementById("root").innerHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2c3e50;">Host App</h1>
      <div style="padding: 20px; border: 2px solid #2c3e50; border-radius: 8px; margin-bottom: 20px;">
        <h2>Host App API Test</h2>
        <p>This is the host app that has axios installed as a dependency.</p>
        <h3>API Data (from JSONPlaceholder):</h3>
        <pre id="host-api-data" style="background-color: #f8f9fa; padding: 10px; border-radius: 4px;">Loading...</pre>
      </div>
      <div id="remote-component">Loading remote component...</div>
    </div>
  `;
};

/**
 * Make a test API call in the host app
 */
const makeApiCall = async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    document.getElementById("host-api-data").textContent = JSON.stringify(response.data, null, 2);
  } catch (err) {
    console.error("Host error:", err);
    document.getElementById("host-api-data").textContent = `Error: ${err.message}`;
  }
};

/**
 * Load the remote component
 */
const loadRemoteComponent = async () => {
  try {
    const module = await import("remoteApp/Component");
    document.getElementById("remote-component").innerHTML = module.default();
  } catch (err) {
    console.error("Failed to load remote:", err);
    document.getElementById("remote-component").innerHTML = `
      <div style="color: red; padding: 20px; border: 1px solid red;">
        Error loading remote component: ${err.message}
      </div>
    `;
  }
};

/**
 * Initialize the application
 */
const initApp = async () => {
  await initializeSharedScope();
  renderHostApp();
  await makeApiCall();
  await loadRemoteComponent();
};

// Start the application
initApp();