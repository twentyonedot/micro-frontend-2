import React, { Suspense } from "react";
import _ from "lodash";

// Dynamically import the remote component
const RemoteButton = React.lazy(() => import("remoteApp/Button"));

const App = () => {
  const greeting = _.join(["Hello", "from", "Host"], " ");
  return (
    <div>
      <h1>{greeting}</h1>
      <Suspense fallback={<div>Loading Remote Button...</div>}>
        <RemoteButton />
      </Suspense>
    </div>
  );
};

export default App;
