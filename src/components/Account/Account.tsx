import React from "react";

import { useUser } from "~/recoil/auth";

import AccountAvatar from "./AccountAvatar";
import AccountSignInButton from "./AccountSignInButton";

function Account() {
  const user = useUser();

  return user ? <AccountAvatar user={user} /> : <AccountSignInButton />;
}

export default Account;
