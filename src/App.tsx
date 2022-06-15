import React from "react";

import { BaseStyles, ThemeProvider } from "@primer/react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <Routes>
          <Route path="/" element={<p>Hello Vite + React!</p>} />
        </Routes>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
