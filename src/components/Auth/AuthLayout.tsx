import React from "react";

import { ActionList, PageLayout } from "@primer/react";

import Layout from "~/components/Layout";

import PrivateRoute from "./PrivateRoute";

function AuthLayout() {
  const actionItems = ["Followers", "Following"];
  const [selectedItem, setSelectedItem] = React.useState(actionItems[0]);

  return (
    <PrivateRoute>
      <Layout>
        <PageLayout.Pane position="start" width="small" divider="line">
          <ActionList>
            {actionItems.map((item) => (
              <ActionList.Item
                key={item}
                active={item === selectedItem}
                onSelect={() => setSelectedItem(item)}
              >
                {item}
              </ActionList.Item>
            ))}
          </ActionList>
        </PageLayout.Pane>
      </Layout>
    </PrivateRoute>
  );
}

export default AuthLayout;
