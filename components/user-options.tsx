"use client";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";

interface UserOptionsProps {
  name: string;
  email: string;
}

const UserOptions = ({ name, email }: UserOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative">
        <button
          id="dropdownUserAvatarButton"
          style={{ float: "right" }}
          className="inline-flex items-center mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="profile-picture.jpg"
            alt="user photo"
          />
        </button>

        {isOpen && (
          <div
            id="dropdownAvatar"
            ref={dropdownRef}
            className="absolute right-0 mt-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 z-10"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{name}</div>
              <div className="font-medium truncate">{email}</div>
            </div>
            <div className="py-2">
              <a
                href="#"
                onClick={() => signOut()}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserOptions;
