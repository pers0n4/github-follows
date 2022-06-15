import React from "react";

import { Box, Heading, Spinner } from "@primer/react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuthActions } from "../recoil/auth";

function Authorize() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signIn } = useAuthActions();

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      const { code, state } = Object.fromEntries(searchParams);
      if (code) {
        await signIn({ code, state });
      }
      navigate("/", { replace: true });
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box display="flex" flexDirection="column" alignItems="center" py="12">
      <Spinner size="large" />
      <Heading sx={{ fontSize: 3, mt: 2 }}>
        Authorizing OAuth Application...
      </Heading>
    </Box>
  );
}

export default Authorize;
