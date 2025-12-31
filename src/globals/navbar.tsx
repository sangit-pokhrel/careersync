// "use client"
// import React,{useState} from "react";
// import Link from "next/link";
// import { CiSearch } from "react-icons/ci";
// import { LuMoon } from "react-icons/lu";
// import { GoSun } from "react-icons/go";
// import './styles/style.color.css'
// import { useContext } from "react";
// import { ThemeContext } from "@/app/context/ThemeProvider";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { DiVim } from "react-icons/di";
// import { IoIosArrowDropright } from "react-icons/io";
// import { motion, AnimatePresence } from "framer-motion";
// import { RxCross2 } from "react-icons/rx";

// import Logo from "./Logo.png"



// const Navabar=()=>{
//   const{theme,toggleTheme} = useContext(ThemeContext);
//   const sections = [{name:"Jobs",link:"/jobs"},{name:"Analyse-Cv",link:"/analyse-cv"},{name:"About",link:"/about",},{name:"Services",link:"/services"},{name:"Contact",link:"/contact"}];
//   const [isDarkMode,setIsDarkMode]=useState(false);
//   const [isOpen,setIsOpen] = useState(false);
//   const handleClick = ()=>{
//       setIsOpen(prev=>!prev);
//   }
//   return(
//     <div>
//       <div className="fixed top-0 left-0 right-0 z-50  py-2 max-w-6xl mx-auto  ">
//       <div className="backdrop-blur-sm bg-white/40 max-w-6xl  h-1/2 border border-gray-400 flex items-center-safe justify-evenly  p-2 mx-auto rounded-4xl ">
//         <div >
//           <img src="./logo.png" />
//         </div>
//         <div className="md:grid grid-cols-5 gap-1  hidden  ">
//           {sections.map((section)=>{
//             return(
             
//                 <Link className="text-center"key={section.name} href={section.link}>
//                 {section.name}
//               </Link>
           
//             )
//           })}
//         </div>
//         <div className="flex gap-3 items-center">
//           <div>
//             <CiSearch size={20} />  
//           </div>
//           <div className="cursor-pointer" onClick={toggleTheme} >
//               {theme!=='light' ? (
//                 <LuMoon size={20} onClick={() => setIsDarkMode(prev=>!prev)} />
//               ) : (
//                 <GoSun size={20} onClick={() => setIsDarkMode(prev=>!prev)} />
//               )}
//           </div>
//           <div>
//               <button className="cta_button_secondary px-3 py-1 rounded-xl text-white">Get Started</button>
//           </div>
//         </div>
//         <div className="md:hidden" onClick = {handleClick}>
//           <RxHamburgerMenu/>
//         </div>
//       </div>
//     </div>
 
//  {/* Mobile View  */}
//       <AnimatePresence>
//          {isOpen && (
//   <div className="fixed inset-0 z-50 flex items-start ">
//     {/* Blurred background */}
//     <div className="absolute inset-0 bg-white/20  backdrop-blur-sm" onClick={handleClick}></div>

//     {/* Navbar content */}
//     <motion.div className=" relative h-screen z-50 w-[60%] bg-white"
//     initial={{ x: "-100%", opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         exit={{ x: "-100%", opacity: 0 }}
//         transition={{ type: "spring", stiffness: 300, damping: 30 }}>
//           <div className=" absolute top-3 right-3" onClick={handleClick}>
//             <RxCross2/>
//           </div>
//       <div className=" h-screen gap-y-5 grid grid-cols-1 items-center  ">
//        <div className="grid grid-cols-1 gap-y-8 px-5">
//          {sections.map((section) => (
//           <div key={section.name} className="text-2xl flex justify-start items-center gap-x-4 in-active:cta_button_secondary  ">
//            <IoIosArrowDropright /> <Link href={section.link}>{section.name}</Link>
            
//           </div>
//         ))}
//        </div>
//       </div>
//     </motion.div>
//   </div>
// )}

//       </AnimatePresence>
     

//     </div>
//   )
// }
// export default Navabar;


"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { LuMoon } from "react-icons/lu";
import { GoSun } from "react-icons/go";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { IoIosArrowDropright } from "react-icons/io";
import { FiUser, FiLogOut, FiGrid } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeProvider";
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5000/api/v1";
import "./styles/navbar.css"
interface User {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
}

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const sections = [
    { name: "Jobs", link: "/jobs" },
    { name: "Analyse-Cv", link: "/analyse-cv" },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch user data on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${BASE_URL}/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          // Check if we got valid user data
          if (data && (data.user || data._id)) {
            setUser(data.user || data);
          } else {
            setUser(null);
          }
        } else {
          // Token invalid or expired
          setUser(null);
          // Optionally clear invalid token
          if (response.status === 401) {
            Cookies.remove("accessToken");
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const accessToken = Cookies.get("accessToken");

      // Call logout endpoint if you have one
      await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear cookies
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      setUser(null);
      setShowDropdown(false);
      router.push("/");
    }
  };

  const getDashboardRoute = () => {
    if (!user) return "/login";
    return user.role === "admin" ? "/admin/dashboard" : "/dashboard";
  };

  const getUserInitials = () => {
    if (!user) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.fullName) {
      const parts = user.fullName.split(" ");
      return parts.length > 1
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : parts[0][0].toUpperCase();
    }
    return user.email[0].toUpperCase();
  };

  return (
    <div>
      {/* Desktop Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 py-3 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Glass morphism container */}
          <div
            className="
              backdrop-blur-md 
              bg-white/70 
              dark:bg-gray-900/70
              border border-gray-200/50 
              dark:border-gray-700/50
              shadow-lg 
              shadow-gray-200/20
              dark:shadow-gray-900/30
              rounded-full 
              px-6 
              py-3
              flex 
              items-center 
              justify-between
            "
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center shadow-md">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="font-semibold text-gray-800 dark:text-white text-lg">
                CV Saathi
              </span>
            </Link>

            {/* Navigation Links - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {sections.map((section) => (
                <Link
                  key={section.name}
                  href={section.link}
                  className="text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium text-sm"
                >
                  {section.name}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button className="p-2 text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors">
                <CiSearch size={20} />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-cyan-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
              >
                {theme === "light" ? (
                  <LuMoon size={18} />
                ) : (
                  <GoSun size={18} />
                )}
              </button>

              {/* Auth Section */}
              {isLoading ? (
                // Loading skeleton
                <div className="w-20 h-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              ) : user ? (
                // Logged in - Show user avatar with dropdown
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.fullName || user.email}
                        className="w-8 h-8 rounded-full object-cover border-2 border-cyan-400"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-sm font-semibold">
                        {getUserInitials()}
                      </div>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                      >
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">
                            {user.fullName ||
                              `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                              "User"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user.email}
                          </p>
                          <span
                            className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                : "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400"
                            }`}
                          >
                            {user.role === "admin" ? "Admin" : "User"}
                          </span>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          <Link
                            href={getDashboardRoute()}
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <FiGrid size={16} />
                            <span>
                              {user.role === "admin"
                                ? "Admin Dashboard"
                                : "Dashboard"}
                            </span>
                          </Link>

                          <Link
                            href="/profile"
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                          >
                            <FiUser size={16} />
                            <span>Profile</span>
                          </Link>

                          <hr className="my-2 border-gray-100 dark:border-gray-700" />

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <FiLogOut size={16} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                // Not logged in - Show Get Started button
                <Link
                  href="/login"
                  className="
                    bg-gradient-to-r from-cyan-400 to-cyan-500 
                    hover:from-cyan-500 hover:to-cyan-600
                    text-white 
                    px-5 py-2 
                    rounded-full 
                    text-sm 
                    font-medium 
                    shadow-md 
                    hover:shadow-lg 
                    transition-all
                    whitespace-nowrap
                  "
                >
                  Get Started
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                onClick={handleClick}
              >
                <RxHamburgerMenu size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={handleClick}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative h-full w-[75%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={handleClick}
                className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <RxCross2 size={24} />
              </button>

              {/* Logo */}
              <div className="px-6 pt-6 pb-8 border-b border-gray-100 dark:border-gray-800">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={handleClick}
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-white text-xl">
                    CV Saathi
                  </span>
                </Link>
              </div>

              {/* User Info (if logged in) */}
              {user && (
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.fullName || user.email}
                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-lg font-semibold">
                        {getUserInitials()}
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {user.fullName ||
                          `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                          "User"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <nav className="px-4 py-6">
                <div className="space-y-2">
                  {sections.map((section) => (
                    <Link
                      key={section.name}
                      href={section.link}
                      onClick={handleClick}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <IoIosArrowDropright
                        size={20}
                        className="text-cyan-500"
                      />
                      <span className="font-medium">{section.name}</span>
                    </Link>
                  ))}

                  {/* Dashboard link for logged in users */}
                  {user && (
                    <Link
                      href={getDashboardRoute()}
                      onClick={handleClick}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <FiGrid size={20} className="text-cyan-500" />
                      <span className="font-medium">
                        {user.role === "admin" ? "Admin Dashboard" : "Dashboard"}
                      </span>
                    </Link>
                  )}
                </div>
              </nav>

              {/* Bottom Actions */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100 dark:border-gray-800">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      handleClick();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                  >
                    <FiLogOut size={18} />
                    <span>Logout</span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={handleClick}
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-xl font-medium hover:from-cyan-500 hover:to-cyan-600 transition-all shadow-lg"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
    </div>
  );
};

export default Navbar;