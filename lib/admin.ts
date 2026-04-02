import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function getAdminAccess() {
  const session = await auth();
  const localPreviewMode =
    process.env.NODE_ENV !== "production" && process.env.ALLOW_ADMIN_BYPASS === "true";

  if (!session && !localPreviewMode) {
    redirect("/admin/login");
  }

  return {
    session,
    localPreviewMode
  };
}
