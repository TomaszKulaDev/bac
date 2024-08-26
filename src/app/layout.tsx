// src/app/layout.tsx
import Link from "next/link";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul className="flex space-x-4 p-4 bg-gray-800 text-white">
              <li>
                <Link href="/users">Users</Link>
              </li>
              <li>
                <Link href="/admin">Admin</Link>
              </li>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="/subscription">Subscription</Link>
              </li>
              <li>
                <Link href="/gamification">Gamification</Link>
              </li>
              <li>
                <Link href="/jobs">Jobs</Link>
              </li>
              <li>
                <Link href="/mentorship">Mentorship</Link>
              </li>
              <li>
                <Link href="/dance-schools">Dance Schools</Link>
              </li>
              <li>
                <Link href="/community">Community</Link>
              </li>
              <li>
                <Link href="/funny-images">Funny Images</Link>
              </li>
              <li>
                <Link href="/music">Music</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/accommodations">Accommodations</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
