import React from "react";

import { Box, PageLayout } from "@primer/react";
import { Outlet } from "react-router-dom";

import PageHeader from "./PageHeader";

function Layout({ children }: React.PropsWithChildren<unknown>) {
  return (
    <Box bg="canvas.default" minHeight="100vh">
      <PageHeader />
      <PageLayout>
        <PageLayout.Content>
          <Outlet />
        </PageLayout.Content>
        {children}
      </PageLayout>
    </Box>
  );
}

export default Layout;
