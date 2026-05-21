"use client";

import "./styles.css";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { MdSpaceDashboard, MdLocalMovies } from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { GiRaiseZombie } from "react-icons/gi";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
  exact?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Início",    path: "/",          icon: <MdSpaceDashboard />, exact: true },
  { label: "Top",       path: "/topFilmes", icon: <MdLocalMovies /> },
  { label: "Gêneros",   path: "/generos",   icon: <GiRaiseZombie /> },
  { label: "Trending",  path: "/trending",  icon: <IoIosTrendingUp /> },
  { label: "Favoritos", path: "/favoritos", icon: <FaRegStar /> },
];

export function NavbarComponent() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="bottomNav" aria-label="Navegação principal">
      {NAV_ITEMS.map((item) => {
        const isActive = item.exact
          ? pathname === item.path
          : pathname.startsWith(item.path);

        return (
          <button
            key={item.path}
            type="button"
            className={`bottomNavItem${isActive ? " active" : ""}`}
            onClick={() => router.push(item.path)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="bottomNavIcon" aria-hidden="true">{item.icon}</span>
            <span className="bottomNavLabel">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
