import React from "react";

import { ThemeProvider, BaseStyles } from "@primer/react";

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <p>Hello Vite + React!</p>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
