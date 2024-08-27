import dynamic from "next/dynamic";

const ResetPassword = dynamic(() => import("./ResetPasswordClient"), {
  ssr: false,
});

export default function ResetPasswordPage() {
  return (
    <div>
      <ResetPassword />
    </div>
  );
}
