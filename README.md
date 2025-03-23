# Micro Frontend with Shared Dependencies

This project demonstrates how to share dependencies between micro frontends using Webpack Module Federation.

## Project Structure

The project consists of two micro frontends:

1. **Host App**: Running on port 3004, has axios installed as a dependency
2. **Remote App**: Running on port 3005, uses axios from the host app without installing it as a dependency

## How It Works

### Module Federation Configuration

The key to sharing dependencies is the Module Federation plugin configuration in the webpack config files:

#### Host App (webpack.config.js)
```javascript
new ModuleFederationPlugin({
  name: "hostApp",
  filename: "remoteEntry.js",
  remotes: {
    remoteApp: "remoteApp@http://localhost:3005/remoteEntry.js",
  },
  shared: {
    axios: {
      singleton: true,
      requiredVersion: "^1.6.8",
      eager: true,
    },
  },
})
```

#### Remote App (webpack.config.js)
```javascript
new ModuleFederationPlugin({
  name: "remoteApp",
  filename: "remoteEntry.js",
  exposes: {
    "./Component": "./src/Component",
  },
  shared: {
    axios: {
      singleton: true,
      requiredVersion: "^1.6.8",
      eager: true,
    },
  },
})
```

### Key Configuration Options

- **singleton**: Ensures only one instance of the dependency is used across all micro frontends
- **requiredVersion**: Specifies the version range that's acceptable
- **eager**: When true, the dependency is loaded eagerly instead of asynchronously

## Running the Applications

1. Start the host app:
   ```
   cd host-app
   npm start
   ```

2. Start the remote app:
   ```
   cd remote-app
   npm start
   ```

3. Open your browser and navigate to:
   - Host App: http://localhost:3004
   - Remote App: http://localhost:3005

## Testing the Shared Dependency

The host app loads the remote component and both make API calls using the shared axios instance. You can see the API responses displayed in the UI.

## Troubleshooting

If you encounter issues with the shared dependency:

1. Check the browser console for errors
2. Ensure both applications are running
3. Verify that the webpack configurations match and have the correct ports
4. Make sure the version ranges for shared dependencies are compatible
