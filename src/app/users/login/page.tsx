// src/app/users/login/page.tsx
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => signIn("google")}>Login with Google</button>
      <button onClick={() => signIn("facebook")}>Login with Facebook</button>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" />
        <label>
          Email
          <input name="email" type="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
