import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FiMenu, FiX, FiUser, FiPlus, FiLogOut } from "react-icons/fi";

import { removeCookie } from "../utils/cookies";
import { getProfile } from "../services/user";
import ThemeToggle from "../components/ThemeToggle";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideDesktop = !desktopDropdownRef.current?.contains(
        event.target,
      );

      const clickedOutsideMobile = !mobileDropdownRef.current?.contains(
        event.target,
      );

      if (clickedOutsideDesktop && clickedOutsideMobile) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dashboardPath = user?.data?.role === "ADMIN" ? "/admin" : "/dashboard";

  const logoutHandler = () => {
    removeCookie();

    queryClient.setQueryData(["profile"], null);

    setDropdownOpen(false);
    setMenuOpen(false);

    navigate("/auth", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm">
      <div className="mx-auto flex items-center gap-3 md:gap-10 px-4 py-3 lg:px-10">
        {/* Mobile menu */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          className="rounded-lg p-2 text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] md:hidden"
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

          {user ? (
            <div className="relative" ref={desktopDropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-tertiary)] p-2.5 text-[var(--text-primary)] transition-colors hover:opacity-80"
              >
                <FiUser size={22} />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-3 w-48 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] p-2 shadow-lg">
                  <Link
                    to={dashboardPath}
                    onClick={() => setDropdownOpen(false)}
                    className="block rounded-md p-3 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                  >
                    {user.data.role === "ADMIN" ? "پنل مدیریت" : "داشبورد"}
                  </Link>

                  <button
                    type="button"
                    onClick={logoutHandler}
                    className="flex w-full items-center gap-2 rounded-md p-3 text-sm text-[var(--color-primary)] hover:bg-[var(--bg-tertiary)]"
                  >
                    <FiLogOut size={18} />
                    خروج از حساب
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-tertiary)] p-2.5 text-[var(--text-primary)] transition-colors hover:opacity-80"
            >
              ورود / ثبت‌نام
            </Link>
          )}
        </div>

        {/* Desktop ad button */}
        <Link
          to="/posts/create"
          className="hidden shrink-0 items-center gap-2 rounded-lg bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-primary-hover)] md:flex"
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
        <nav className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 md:hidden">
          <div className="flex flex-col gap-1">
            {user ? (
              <div ref={mobileDropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-full rounded-lg px-3 py-3 text-right text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                >
                  دیوار من
                </button>

                {dropdownOpen && (
                  <div className="mr-3 border-r-2 border-[var(--border-color)] pr-3">
                    <Link
                      to={dashboardPath}
                      onClick={() => {
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block rounded-lg px-3 py-3 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                    >
                      {user.data.role === "ADMIN" ? "پنل مدیریت" : "داشبورد"}
                    </Link>

                    <button
                      type="button"
                      onClick={logoutHandler}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm text-[var(--color-primary)] hover:bg-[var(--bg-tertiary)]"
                    >
                      <FiLogOut size={18} />
                      خروج از حساب
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
              >
                ورود / ثبت‌نام
              </Link>
            )}

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
