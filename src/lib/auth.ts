import { JWT } from "next-auth/jwt";
import { apiRequest } from "./api";
import { loginResponse } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/*
this function is used to refresh the access token when it is expired
it will be called in the api route when the access token is expired
it will check if the refresh token is valid or not
if it is valid it will get a new access token and return it
otherwise it will return null
*/
async function refreshAccessToken(Token: JWT): Promise<any> {
  try {
    const response = await apiRequest<loginResponse>({
      endpoint: "/users/refresh",
      method: "PATCH",
      body: {
        refreshToken: Token.refreshToken,
        role: Token.role,
        sub: Token.name,
      },
    });

    const newToken = response.backendTokens;
    const decodeToken = newToken.accessToken
      ? jwtDecode(newToken.accessToken)
      : null;

    return {
      ...Token,
      backendTokens: {
        ...newToken,
      },
      accessTokenExpired: decodeToken?.exp
        ? decodeToken.exp * 1000
        : Date.now() + 60 * 60 * 1000, // 1 hour
    };
  } catch (error) {
    console.error("Error in refreshAccessToken:", error);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "phone", type: "text", placeholder: "wignn" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          return null;
        }


        const response = await apiRequest<loginResponse>({
          endpoint: "/users",
          method: "PATCH",
          body: {
            phone: credentials.phone,
            password: credentials.password,
          },
        });

        if (response === null) {
          return null;
        }

        const user = response;
        const newTokens = user.backendTokens;
        const decodedToken = newTokens?.accessToken
          ? jwtDecode(newTokens.accessToken)
          : null;

        return {
          id: user.id_user, 
          ...user,
          accessTokenExpires: decodedToken?.exp
            ? decodedToken.exp * 1000
            : Date.now(),
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      return { ...session, ...token };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
