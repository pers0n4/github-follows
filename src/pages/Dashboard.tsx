import React from "react";

import { Box, Button } from "@primer/react";

import FollowsBox from "~/components/FollowsBox";
import {
  useFilteredFollows,
  useFollowsActions,
  useFollowsTypes,
} from "~/recoil/follows";

function Dashboard() {
  const [filter] = useFollowsTypes();
  const [fillteredFollows, setFillteredFollows] = useFilteredFollows();
  const { fetchFollows, follow, unfollow } = useFollowsActions();

  React.useEffect(() => {
    fetchFollows(); // eslint-disable-line @typescript-eslint/no-floating-promises
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const createButton = (id: string) => {
    switch (filter) {
      case "Followers":
        return (
          <Button
            variant="outline"
            onClick={async () => {
              await follow(id);
              setFillteredFollows(
                fillteredFollows.filter((item) => item.id !== id),
              );
            }}
          >
            Follow
          </Button>
        );
      case "Following":
        return (
          <Button
            variant="danger"
            onClick={async () => {
              await unfollow(id);
              setFillteredFollows(
                fillteredFollows.filter((item) => item.id !== id),
              );
            }}
          >
            Unfollow
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridRowGap={2}>
      {fillteredFollows.map((filteredFollow) => (
        <FollowsBox
          user={filteredFollow}
          key={filteredFollow.id}
          actionButton={createButton(filteredFollow.id)}
        />
      ))}
    </Box>
  );
}

export default Dashboard;
