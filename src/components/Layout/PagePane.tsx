import React from "react";

import { ActionList } from "@primer/react";

function PagePane() {
  return (
    <ActionList>
      <ActionList.Item>Followers</ActionList.Item>
      <ActionList.Item>Followings</ActionList.Item>
    </ActionList>
  );
}

export default PagePane;
