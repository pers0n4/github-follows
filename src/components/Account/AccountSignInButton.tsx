import React from "react";

import { MarkGithubIcon } from "@primer/octicons-react";
import { Button } from "@primer/react";

function AccountSignInButton() {
  const handleSignIn = () => {
    window.location.assign("/api/github/oauth/login");
  };

  return (
    <Button
      variant="primary"
      leadingIcon={MarkGithubIcon}
      onClick={handleSignIn}
    >
      Sign in with GitHub
    </Button>
  );
}

export default AccountSignInButton;
