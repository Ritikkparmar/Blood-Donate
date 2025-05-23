"use client";

import React, { useEffect, useState } from "react";
import { BiDonateBlood } from "react-icons/bi";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { Button } from "./ui/button";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed left-0 top-0 w-80 bg-white dark:bg-black h-full shadow-lg z-50 transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center">
            <Link href="/" className="text-red-800">
              <BiDonateBlood size={30} />
            </Link>
            <button onClick={onClose}>
              <svg
                className="w-6 h-6 text-gray-500 hover:text-red-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <ul className="p-4">
              <li className="mb-4 hover:text-red-800 transition-colors duration-300">
                <Link href="/FindBlood">Find Blood</Link>
              </li>
              <li className="mb-4 hover:text-red-800 transition-colors duration-300">
                <Link href="/DonorForm">Register Donor</Link>
              </li>
              <li className="mb-4 hover:text-red-800 transition-colors duration-300">
                <Link href="/OrgForm">Register Organization</Link>
              </li>
              <li className="mr-4 hover:text-red-800 transition-colors duration-300">
                <Link href="/RegisteredOrgs">Registered Organizations</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const { userId } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const isMobile = windowWidth <= 768;

  return (
    <>
      <nav className="sticky top-0 px-4 py-1 flex items-center justify-between shadow-md z-10 bg-slate-50 dark:bg-[#191818]">
        <div className="flex items-center rounded-full border-2 border-red-800 p-2">
          <Link href="/" className="text-red-800">
            <BiDonateBlood size={30} />
          </Link>
        </div>

        {isMobile && userId && (
          <button
            className="text-red-800 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        )}

        {!isMobile && userId && (
          <ul className="p-4 flex">
            <li className="mr-4 hover:text-red-800 transition-colors duration-300">
              <Link href="/FindBlood">Find Blood</Link>
            </li>
            <li className="mr-4 hover:text-red-800 transition-colors duration-300">
              <Link href="/DonorForm">Register Donor</Link>
            </li>
            <li className="mr-4 hover:text-red-800 transition-colors duration-300">
              <Link href="/OrgForm">Register Organization</Link>
            </li>
            <li className="mr-4 hover:text-red-800 transition-colors duration-300">
                <Link href="/RegisteredOrgs">Registered Organizations</Link>
              </li>
          </ul>
        )}

        <div className="flex items-center gap-4">
          {!userId ? (
            <>
              <Link href="/sign-up">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm m-2 px-4"
                >
                  Sign Up
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm m-2 px-4"
                >
                  Sign In
                </Button>
              </Link>
            </>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </nav>

      {isMobile && (
        <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      )}
    </>
  );
};

export default Navbar;
