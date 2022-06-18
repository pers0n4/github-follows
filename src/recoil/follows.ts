import { graphql } from "@octokit/graphql";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import { tokenState } from "./auth";

import type { User } from "@octokit/graphql-schema";

export const followsTypes = ["Followers", "Following"] as const;

export type FollowsType = typeof followsTypes[number];

export const followsTypeState = atom<FollowsType>({
  key: "FOLLOWS_TYPE_ATOM",
  default: followsTypes[0],
});

export const followsState = atom({
  key: "FOLLOWS_ATOM",
  default: {
    followers: [] as User[],
    following: [] as User[],
  },
});

export const filteredFollowsState = selector({
  key: "FILTERED_FOLLOWS_SELECTOR",
  get: ({ get }) => {
    const { followers, following } = get(followsState);
    const followsType = get(followsTypeState);

    switch (followsType) {
      case "Followers":
        return followers.filter((user) => !user.viewerIsFollowing);
      case "Following":
        return following.filter((user) => !user.isFollowingViewer);
      default:
        return [...followers, ...following];
    }
  },
  set: ({ get, set }, newValue) => {
    const { followers, following } = get(followsState);
    const followsType = get(followsTypeState);
    switch (followsType) {
      case "Followers":
        set(followsState, {
          followers: newValue as User[],
          following,
        });
        break;
      case "Following":
        set(followsState, {
          followers,
          following: newValue as User[],
        });
        break;
      default:
        return [...followers, ...following];
    }
  },
});

export function useFollowsTypes() {
  return useRecoilState(followsTypeState);
}

export function useFilteredFollows() {
  return useRecoilState(filteredFollowsState);
}

export function useFollowsActions() {
  const token = useRecoilValue(tokenState);
  const setFollows = useSetRecoilState(followsState);

  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: token,
    },
  });

  async function fetchFollows() {
    const {
      viewer: {
        followers: { totalCount: followersCount },
        following: { totalCount: followingCount },
      },
    } = await graphqlWithAuth<{ viewer: User }>(/* GraphQL */ `
      query {
        viewer {
          followers {
            totalCount
          }
          following {
            totalCount
          }
        }
      }
    `);

    const {
      viewer: {
        followers: { nodes: followers },
        following: { nodes: following },
      },
    } = await graphqlWithAuth<{ viewer: User }>(
      /* GraphQL */ `
        query ($followersCount: Int!, $followingCount: Int!) {
          viewer {
            followers(first: $followersCount) {
              nodes {
                id
                login
                name
                url
                avatarUrl
                viewerIsFollowing
              }
            }
            following(first: $followingCount) {
              nodes {
                id
                login
                name
                url
                avatarUrl
                isFollowingViewer
              }
            }
          }
        }
      `,
      {
        followersCount,
        followingCount,
      },
    );

    setFollows({
      followers: followers as User[],
      following: following as User[],
    });
  }

  async function getNodeType(id: string) {
    const {
      node: { __typename: nodeType },
    } = await graphqlWithAuth<{
      node: {
        __typename: "Organization" | "User";
      };
    }>(
      /* GraphQL */ `
        query ($id: ID!) {
          node(id: $id) {
            __typename
          }
        }
      `,
      {
        id,
      },
    );
    return nodeType;
  }

  async function follow(id: string) {
    const nodeType = await getNodeType(id);
    switch (nodeType) {
      case "User":
        return graphqlWithAuth(
          /* GraphQL */ `
            mutation ($input: FollowUserInput!) {
              followUser(input: $input) {
                __typename
              }
            }
          `,
          {
            input: {
              userId: id,
            },
          },
        );
      case "Organization":
        return graphqlWithAuth(
          /* GraphQL */ `
            mutation ($input: FollowOrganizationInput!) {
              followOrganization(input: $input) {
                __typename
              }
            }
          `,
          {
            input: {
              organizationId: id,
            },
          },
        );
      default:
        throw new Error("Unknown node type");
    }
  }

  async function unfollow(id: string) {
    const nodeType = await getNodeType(id);
    switch (nodeType) {
      case "User":
        return graphqlWithAuth(
          /* GraphQL */ `
            mutation ($input: UnfollowUserInput!) {
              unfollowUser(input: $input) {
                __typename
              }
            }
          `,
          {
            input: {
              userId: id,
            },
          },
        );
      case "Organization":
        return graphqlWithAuth(
          /* GraphQL */ `
            mutation ($input: UnfollowOrganizationInput!) {
              unfollowOrganization(input: $input) {
                __typename
              }
            }
          `,
          {
            input: {
              organizationId: id,
            },
          },
        );
      default:
        throw new Error("Unknown node type");
    }
  }

  return {
    fetchFollows,
    follow,
    unfollow,
  };
}
