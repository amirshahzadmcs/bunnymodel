import dynamic from "next/dynamic";

const Profile = dynamic(
  () => import("../../src/components/app/Profile/Profile"),
  { ssr: false }
);

export default function ProfilePage() {
  return <Profile />;
}
