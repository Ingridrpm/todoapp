"use client";

import { redirect, useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button
      type="button"
      onClick={() => signIn()}
      className="text-white bg-sky-700 hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
    >
      Sign in
    </button>
  );
};

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>Sign Out</button>;
};

export const RegisterButton = () => {
  return (
    <a
      type="button"
      href="/register"
      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base px-6 py-3.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Create an account
    </a>
  );
};
