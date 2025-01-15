import { auth } from "@clerk/nextjs/server";

export const getRoleAndUserId = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;
  return { role, currentUserId };
};

