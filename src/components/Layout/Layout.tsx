import React from "react";

import { Box, PageLayout } from "@primer/react";
import { Outlet } from "react-router-dom";

import { useToken } from "~/recoil/auth";

import PageHeader from "./PageHeader";
import PagePane from "./PagePane";

function Layout() {
  const token = useToken();

  return (
    <Box bg="canvas.default" minHeight="100vh">
      <PageHeader />
      <PageLayout>
        <PageLayout.Content>
          <Outlet />
        </PageLayout.Content>
        {token && (
          <PageLayout.Pane position="start" width="small" divider="line">
            <PagePane />
          </PageLayout.Pane>
        )}
      </PageLayout>
    </Box>
  );
}

export default Layout;
