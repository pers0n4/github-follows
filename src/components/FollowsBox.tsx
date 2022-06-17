import React from "react";

import { Avatar, Box, Text, Link } from "@primer/react";

import type { User } from "@octokit/graphql-schema";

interface Props {
  user: User;
  actionButton: React.ReactNode;
}

function FollowsBox({
  user: { login, avatarUrl, name, url },
  actionButton,
}: Props) {
  return (
    <Box
      display="flex"
      borderColor="border.default"
      borderWidth={1}
      borderStyle="solid"
      borderRadius={2}
      p={2}
    >
      <Avatar size={50} src={String(avatarUrl)} />
      <Box display="flex" flexDirection="column" flexGrow={1} px={2}>
        <Text fontWeight="bold">{name}</Text>
        <Link href={String(url)}>{login}</Link>
      </Box>
      {actionButton && (
        <Box display="flex" alignItems="center">
          {actionButton}
        </Box>
      )}
    </Box>
  );
}

export default FollowsBox;
