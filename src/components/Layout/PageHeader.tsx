import React from "react";

import { FeedHeartIcon } from "@primer/octicons-react";
import { Header, StyledOcticon } from "@primer/react";
import { Link } from "react-router-dom";

import Account from "~/components/Account";

function PageHeader() {
  return (
    <Header sx={{ px: 6 }}>
      <Header.Item full>
        <Header.Link as={Link} to="/">
          <StyledOcticon icon={FeedHeartIcon} size={32} sx={{ mr: 2 }} />
          <span>GitHub Follows</span>
        </Header.Link>
      </Header.Item>
      <Header.Item>
        <Account />
      </Header.Item>
    </Header>
  );
}

export default PageHeader;
