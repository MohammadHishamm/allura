"use client";

import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
                  className={`h-0.5 w-6 bg-white rounded-full origin-left transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-6 bg-white rounded-full transition-all duration-300 ${
                    menuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`h-0.5 w-6 bg-white rounded-full origin-left transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Desktop menu */}
          <div
            className="hidden md:flex items-center mx-auto gap-2"
            data-aos="fade-up"
          >
            {[
              { href: "/", label: "Home", active: true },
              { href: "/#benefits", label: "Benefits" },
              { href: "/#plans", label: "Plans" },
              { href: "/#contact", label: "Contact" },
              { href: "/tutorial", label: "Tutorials" },
              { href: "/blogs", label: "Blogs" },
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
                  ${item.active ? "bg-white/10" : "hover:bg-white/5"}
                `}
                data-aos="zoom-in"
                data-aos-delay={idx * 100} // 👈 staggered animation
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
            {/* Dark/Light mode toggle */}
            <button
              className="flex items-center justify-center w-10 h-10 hover:bg-white/10 text-white rounded-lg transition-all duration-200"
              aria-label="Switch to light mode"
              title="Switch to light mode"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
              </svg>
            </button>

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

          {/* Login Button */}
          <div className="hidden md:block ml-4 m-5" data-aos="zoom-in">
            <button
              className="btn-theme cursor-target"
              onClick={() => (window.location.href = "/signin")}
            >
              Sign In
            </button>
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
              { href: "/", label: "home", active: true },
              { href: "/#benefits", label: "Benefits" },
              { href: "/#plans", label: "Plans" },
              { href: "/#contact", label: "Contact" },
              { href: "/tutorial", label: "Tutorials" },
              { href: "/blogs", label: "Blogs" },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={`
                  px-3 py-2 text-[15px]
                  font-medium text-white rounded
                  transition-all duration-200 cursor-target
                  ${item.active ? "bg-white/10" : "hover:bg-white/5"}
                `}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                {item.label}
              </a>
            ))}

            {/* Sign In for mobile */}
            <button
              className="mt-2 btn-theme cursor-target"
              onClick={() => (window.location.href = "/signin")}
              data-aos="zoom-in"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
