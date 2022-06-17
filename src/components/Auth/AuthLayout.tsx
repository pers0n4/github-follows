import React from "react";

import { ActionList, PageLayout } from "@primer/react";

import Layout from "~/components/Layout";
import { followsTypes, useFollowsTypes } from "~/recoil/follows";

import PrivateRoute from "./PrivateRoute";

function AuthLayout() {
  const [followsType, setFollowsType] = useFollowsTypes();

  return (
    <PrivateRoute>
      <Layout>
        <PageLayout.Pane position="start" width="small" divider="line">
          <ActionList>
            {followsTypes.map((item) => (
              <ActionList.Item
                key={item}
                active={item === followsType}
                onSelect={() => setFollowsType(item)}
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
