import { graphql } from "@octokit/graphql";
import axios from "axios";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

import type {
  OAuthAppAuthentication,
  WebFlowOptions,
} from "@octokit/auth-oauth-user/dist-types/types";
import type { User } from "@octokit/graphql-schema";
import type { AtomEffect } from "recoil";

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue) as T);
    }

    onSet((newValue, _, isReset) => {
      if (
        isReset ||
        newValue === null ||
        (typeof newValue === "string" && newValue.length === 0)
      ) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const tokenState = atom({
  key: "TOKEN_ATOM",
  default: "",
  effects: [localStorageEffect("token")],
});

export const userState = atom<User | null>({
  key: "USER_ATOM",
  default: null,
  effects: [localStorageEffect("user")],
});

export function useToken() {
  return useRecoilValue(tokenState);
}

export function useUser() {
  return useRecoilValue(userState);
}

export function useAuthActions() {
  const [token, setToken] = useRecoilState(tokenState);
  const setUser = useSetRecoilState(userState);

  async function signIn({ code, state, redirectUrl }: WebFlowOptions) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    const {
      data: { authentication },
    } = await axios.post<{
      authentication: OAuthAppAuthentication;
    }>("/api/github/oauth/token", {
      code,
      state,
      redirectUrl,
    });

    const { token: accessToken, type } = authentication;
    const authorization = `${type} ${accessToken}`;

    const { viewer } = await graphql<{ viewer: User }>(
      /* GraphQL */ `
        query {
          viewer {
            id
            login
            name
            url
            avatarUrl
          }
        }
      `,
      {
        headers: {
          authorization,
        },
      },
    );

    setToken(authorization);
    setUser(viewer);
  }

  async function signOut() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await axios.delete("/api/github/oauth/token", {
      headers: { Authorization: token },
    });

    setToken("");
    setUser(null);
  }

  return {
    signIn,
    signOut,
  };
}
