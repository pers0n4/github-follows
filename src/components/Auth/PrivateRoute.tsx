import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { tokenState } from "~/recoil/auth";

function PrivateRoute({ children }: React.PropsWithChildren<unknown>) {
  const token = useRecoilValue(tokenState);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>; // eslint-disable-line react/jsx-no-useless-fragment
}

export default PrivateRoute;
