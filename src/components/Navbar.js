"use client";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar = () => {
  const { user, error, isLoading } = useUser();
  return <div className="navbar !bg-green-500 flex items-center justify-between top-0 left-0 z-10 p-4">
  <div className="cursor-pointer">
      <a href="/">
        Injury Tracking System
      </a>
  </div>
  <div>
    <ul className="flex gap-5">
      <li>
        <a href="/" className="hover:text-blue-500">
          Reports
        </a>
      </li>
      <li>
        <a href="/create-reports" className="hover:text-blue-500">
          Create a report
        </a>
      </li>
      <li>
        <a href="/analytics" className="hover:text-blue-500">
          Analytics
        </a>
      </li>
      <li>
        {user ? (
          <a
            href="/api/auth/logout"
            className="hover:text-blue-500 hover:bg-primary"
          >
            {user ? user.name+" : Logout" : ""}
          </a>
        ) : (
          <a
            href="/api/auth/login"
            className="hover:text-blue-500 hover:bg-primary"
          >
            Login
          </a>
        )}
      </li>
    </ul>
  </div>
  
</div>
};

export default Navbar;
