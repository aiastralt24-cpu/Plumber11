import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getAdminAccess() {
  const session = await auth();
  const localPreviewMode = process.env.DATABASE_URL?.startsWith("file:");

  if (!session && !localPreviewMode) {
    redirect("/admin/login");
  }

  return {
    session,
    localPreviewMode
  };
}
