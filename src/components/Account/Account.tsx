import React from "react";

import { useRecoilValue } from "recoil";

import { userState } from "~/recoil/auth";

import AccountAvatar from "./AccountAvatar";
import AccountSignInButton from "./AccountSignInButton";

function Account() {
  const user = useRecoilValue(userState);

  return user ? <AccountAvatar user={user} /> : <AccountSignInButton />;
}

export default Account;
