import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FiMenu, FiX, FiUser, FiPlus } from "react-icons/fi";

import { getProfile } from "../services/user";
import ThemeToggle from "../components/ThemeToggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });
  

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm">
      <div className="mx-auto flex items-center gap-3 md:gap-10 px-4 py-3 lg:px-10">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          className="rounded-lg p-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] lg:hidden"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex-1" aria-label="صفحه اصلی دیوار">
          <img src="/divar.svg" alt="دیوار" className="h-10 md:h-13 w-auto" />
        </Link>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            to={user ? "/dashboard" : "/auth"}
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--color-primary)]"
          >
            <FiUser size={22} />
            {user ? "دیوار من" : "ورود / ثبت‌نام"}
          </Link>
        </div>

        {/* Desktop ad button */}
        <Link
          to="/posts/create"
          className="hidden shrink-0 items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)] sm:flex"
        >
          <FiPlus size={17} />
          ثبت آگهی
        </Link>

        {/* Mobile theme */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 lg:hidden">
          <div className="flex flex-col gap-1">
            <Link
              to={user ? "/dashboard" : "/auth"}
              className="rounded-lg px-3 py-3 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
            >
              {user ? "دیوار من" : "ورود / ثبت‌نام"}
            </Link>

            <Link
              to="/posts/create"
              className="rounded-lg px-3 py-3 text-sm text-[var(--color-primary)] hover:bg-[var(--bg-tertiary)]"
            >
              ثبت آگهی
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
