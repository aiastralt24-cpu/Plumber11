import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt"
  },
  providers: [
    Credentials({
      name: "Internal Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const parsed = credentialsSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        if (
          parsed.data.email === (process.env.ADMIN_EMAIL ?? "admin@plumbri.ght") &&
          parsed.data.password === (process.env.ADMIN_PASSWORD ?? "plumbright-admin")
        ) {
          return {
            id: "internal-admin",
            email: parsed.data.email,
            name: "PlumbRight Admin"
          };
        }

        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login"
  }
});
