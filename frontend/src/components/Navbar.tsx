"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../auth/auth";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuth, username, logout } = useAuth();
const [activeLink, setActiveLink] = useState(window.location.pathname);

useEffect(() => {
  const handleLocationChange = () => setActiveLink(window.location.pathname);
  window.addEventListener("popstate", handleLocationChange);
  return () => window.removeEventListener("popstate", handleLocationChange);
}, []);

  useEffect(() => {
    AOS.init({
      duration: 800,   // animation duration
      easing: "ease-in-out",
      once: true,      // animate only once
    });
  }, []);

  return (
    <div
      className="fixed top-7 left-0 w-full z-[100] pt-[15px] opacity-100 transform-none"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      <div className="flex justify-center px-4 transition-all duration-300 py-3">
        <div
          className="
            flex items-center justify-between
            border border-white/10
            backdrop-blur-[10px]
            bg-gradient-to-r from-white/20 to-purple-400/20
            rounded-2xl
            p-[10px_20px]
            transition-all duration-300
            shadow-md
          "
          style={{ width: "100%", maxWidth: "1152px", height: "64px" }}
        >
          {/* Logo */}
          <div className="flex items-center" data-aos="fade-right">
            <a href="./" className="flex items-center gap-1.5 z-10">
              <div className="relative w-9 h-9">
                <img
                  alt="Logo"
                  loading="lazy"
                  decoding="async"
                  className="object-contain absolute inset-0 w-full h-full"
                  src="/Алurra Logo Design.png"
                />
              </div>
              <p className="font-space-grotesk text-[15px] font-semibold leading-[1.2em] text-white transition-all duration-300 origin-left">
                Allura
              </p>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden z-10" data-aos="fade-left">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex cursor-target items-center justify-center p-2 -mr-2 rounded-md text-white hover:bg-purple-500/20 focus:outline-none relative z-[95]"
            >
              <span className="sr-only">Toggle menu</span>
              <div className="relative w-6 h-5 flex flex-col justify-between transition-all duration-300">
                <span
                  className={`h-0.5 w-6 bg-white rounded-full origin-left transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                />
                <span
                  className={`h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                  className={`h-0.5 w-6 bg-white rounded-full origin-left transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                />
              </div>
            </button>
          </div>

          {/* Desktop menu */}
          <div
            className="hidden md:flex items-center mx-auto gap-2" data-aos="fade-up">
             {[
               { href: "/", label: "home"},
              // { href: "/#benefits", label: "benefits" },
              // { href: "/#plans", label: "plans" },
               { href: "/contact", label: "contact" },
               { href: "/company", label: "about us" },
               { href: "/joinus", label: "join us" },
               { href: "/projects", label: "projects" },
 
             ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`
                  flex items-center justify-center 
                  transition-all duration-200
                  px-4 py-2 text-[14px] 
                  font-medium text-white rounded
                  whitespace-nowrap
                  cursor-pointer no-underline cursor-target
                   ${activeLink === item.href ? "bg-white/10" : "hover:bg-white/5"}
                `}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div
            className="hidden md:flex items-center gap-2 mr-2"
            data-aos="fade-left"
          >
            {/* Language toggle */}
            <div className="flex items-center">
              <button
                className="flex items-center justify-center w-10 h-8 hover:bg-white/10 text-white rounded-lg transition-colors duration-200 font-medium text-sm overflow-hidden"
                aria-label="Switch to Arabic"
                title="Switch to Arabic"
              >
                <div className="relative w-6 h-4 rounded-sm overflow-hidden">
                  <img
                    alt="Switch to Arabic"
                    loading="lazy"
                    decoding="async"
                    className="object-cover absolute inset-0 w-full h-full"
                    src="https://flagcdn.com/w40/sa.png"
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center gap-2 ml-4" data-aos="zoom-in">
            {isAuth && (
              <>
                {username && (
                  <div className="flex items-center gap-2 px-3 py-2 text-white">
                    <span className="text-sm font-medium">Welcome, {username}</span>
                  </div>
                )}
                <button
                  className="btn-theme cursor-target"
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden px-4 mt-2" data-aos="fade-down">
          <div
            className="
              flex flex-col gap-2 p-4
              border border-white/10
              backdrop-blur-[10px]
              bg-gradient-to-r from-white/20 to-purple-400/20
              rounded-xl shadow-md animate-fadeIn
            "
          >
             {[
               { href: "/", label: "home"},
              // { href: "/#benefits", label: "Benefits" },
              // { href: "/#plans", label: "Plans" },
               { href: "/contact", label: "Contact" },
               { href: "/company", label: "About Us" },
               { href: "/joinus", label: "Join Us" },
               { href: "/projects", label: "projects" },
             ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`
                  px-3 py-2 text-[15px]
                  font-medium text-white rounded
                  transition-all duration-200 cursor-target
                  ${activeLink === item.href ? "bg-white/10" : "hover:bg-white/5"}
                `}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {item.label}
              </a>
            ))}

            {/* Authentication for mobile */}
            {isAuth && (
              <div className="mt-2 flex flex-col gap-2">
                {username && (
                  <div className="px-3 py-2 text-white text-center">
                    <span className="text-sm font-medium">Welcome, {username}</span>
                  </div>
                )}
                <button
                  className="btn-theme cursor-target"
                  onClick={() => {
                    logout();
                    window.location.href = "/";
                  }}
                  data-aos="zoom-in"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
