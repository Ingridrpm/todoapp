import React from "react";
import { LoginButton, RegisterButton } from "@/components/auth";

const Auth = () => {
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
          Welcome to To-do App - Organize Your Tasks
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          To-do App is a powerful and intuitive to-do app designed to simplify
          your task management. With To-do App, you can effortlessly create,
          track, and complete tasks, ensuring that you stay organized and
          productive. Whether you're managing personal projects or collaborating
          with a team, To-do App offers a seamless experience that keeps you on
          top of your game. Sign up now and start taking control of your to-do
          list.
        </p>
        <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
          <LoginButton />
          <RegisterButton />
        </div>
      </div>
    </>
  );
};

export default Auth;
