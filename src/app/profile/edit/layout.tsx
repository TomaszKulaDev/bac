import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import ProfileTabs from "../components/ProfileTabs";

export default async function ProfileEditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <ProfileTabs />
      {children}
    </>
  );
}
