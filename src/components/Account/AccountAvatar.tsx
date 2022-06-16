import React from "react";

import { TriangleDownIcon } from "@primer/octicons-react";
import { ActionList, ActionMenu, Avatar, Box } from "@primer/react";
import { Link } from "react-router-dom";

import { useAuthActions } from "~/recoil/auth";

import type { User } from "@octokit/graphql-schema";

interface Props {
  user: User;
}

function AccountAvatar({ user }: Props) {
  const { signOut } = useAuthActions();

  const handleSignOut = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    signOut();
  };

  return (
    <ActionMenu>
      <ActionMenu.Anchor>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ cursor: "pointer" }}
        >
          <Avatar src={String(user.avatarUrl)} alt={`@${user.login}`} />
          <TriangleDownIcon />
        </Box>
      </ActionMenu.Anchor>

      <ActionMenu.Overlay>
        <ActionList>
          <ActionList.LinkItem as={Link} to="/dashboard">
            Dashboard
          </ActionList.LinkItem>
          <ActionList.Divider />
          <ActionList.Group title="GitHub">
            <ActionList.LinkItem href={`https://github.com/${user.login}`}>
              Your GitHub profile
            </ActionList.LinkItem>
            <ActionList.LinkItem
              href={`https://github.com/settings/connections/applications/${
                import.meta.env.VITE_CLIENT_ID
              }`}
            >
              Review permissions
            </ActionList.LinkItem>
          </ActionList.Group>
          <ActionList.Divider />
          <ActionList.Item onClick={handleSignOut} variant="danger">
            Sign Out
          </ActionList.Item>
        </ActionList>
      </ActionMenu.Overlay>
    </ActionMenu>
  );
}

export default AccountAvatar;
