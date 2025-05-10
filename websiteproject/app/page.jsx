"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <>
      <header>
        <h1>Welcome to QU Student Management Website</h1>
      </header>

      <div className="login-container">
        <form action="" id="login-form">
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" id="white-space">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>
          <p id="error-message"></p>
          <button type="submit" id="submit" name="submit">
            Log In{" "}
          </button>
        </form>
      </div>
    </>
  );
}
