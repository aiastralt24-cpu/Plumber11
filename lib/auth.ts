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
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const localPreviewMode =
          process.env.NODE_ENV !== "production" && process.env.ALLOW_ADMIN_BYPASS === "true";

        if (!parsed.success) {
          return null;
        }

        if (!adminEmail || !adminPassword) {
          if (localPreviewMode) {
            return {
              id: "local-preview-admin",
              email: parsed.data.email,
              name: "Local Preview Admin"
            };
          }

          return null;
        }

        if (parsed.data.email === adminEmail && parsed.data.password === adminPassword) {
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
