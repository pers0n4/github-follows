import React from "react";

import { BaseStyles, ThemeProvider } from "@primer/react";
import { Routes, Route } from "react-router-dom";

import AuthLayout from "~/components/Auth/AuthLayout";
import Layout from "~/components/Layout";
import Authorize from "~/pages/Authorize";
import Dashboard from "~/pages/Dashboard";
import Home from "~/pages/Home";

function App() {
  return (
    <ThemeProvider colorMode="auto">
      <BaseStyles>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="authorize" element={<Authorize />} />
          </Route>
          <Route path="/dashboard" element={<AuthLayout />}>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
