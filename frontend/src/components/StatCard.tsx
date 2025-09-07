"use client";

import { useEffect, useState, useRef, type JSX } from "react";
import { FaProjectDiagram, FaUsers, FaHandshake, FaAward } from "react-icons/fa";

interface StatCardProps {
  title: string;
  value: number;
  icon: JSX.Element;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  const [count, setCount] = useState(0);
  const counted = useRef(false);

  useEffect(() => {
    const element = document.getElementById(title);
    let interval: number;

    const startCounting = () => {
      if (counted.current) return;
      counted.current = true;

      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 20);

      interval = window.setInterval(() => {
        start += increment;
        if (start >= value) {
          start = value;
          clearInterval(interval);
        }
        setCount(Math.floor(start));
      }, 20);
    };

    if (element) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startCounting();
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(element);

      return () => {
        observer.disconnect();
        clearInterval(interval);
      };
    }
  }, [title, value]);

  return (
    <div
      id={title}
      className="relative backdrop-blur-xl bg-white/5 border border-white/10 p-8 h-full flex flex-col items-center justify-center rounded-3xl transform transition hover:scale-105 shadow-lg"
    >
      <div className="text-4xl mb-3  text-purple-300">{icon}</div>
      <h2 className="text-4xl font-bold title">{count}</h2>
      <p className="mt-2 text-lg font-medium title">{title}</p>
    </div>
  );
};

export default function StatsSection() {
  const stats = [
    { title: "Projects", value: 120, icon: <FaProjectDiagram /> },
    { title: "Users", value: 500, icon: <FaUsers /> },
    { title: "Clients", value: 80, icon: <FaHandshake /> },
    { title: "Awards", value: 15, icon: <FaAward /> },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
}
