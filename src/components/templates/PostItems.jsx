import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLocationDot, FaTrash, FaEye, FaEllipsis } from "react-icons/fa6";

import { baseUrl } from "../../constant/baseUrl";
import { formatPersianDate } from "../../utils/formatPersianDate";

function PostItems({ post, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleDelete = () => {
    setMenuOpen(false);
    onDelete(post._id);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[var(--border-color)]">
      {/* Post content */}
      <Link
        to={`/posts/${post._id}`}
        className="flex flex-col gap-4 p-4 md:flex-row md:gap-x-5"
      >
        <img
          src={
            post.images?.[0]
              ? `${baseUrl}/${post.images[0]}`
              : "/placeholder.png"
          }
          alt={post.options.title}
          className="h-[250px] w-full rounded-lg object-cover md:h-[280px] md:w-[200px]"
        />

        <div className="mt-2 flex flex-col gap-6 p-2">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              {post.options.title}
            </h2>

            <p className="line-clamp-2 text-sm text-[var(--text-secondary)] md:text-base">
              {post.options.content}
            </p>

            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <FaLocationDot className="text-[var(--color-primary)]" />
              <p>{post.options.city}</p>
            </div>
          </div>

          <div className="mt-2 space-y-4">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <p>تاریخ انتشار:</p>
              <p>{formatPersianDate(post.createdAt)}</p>
            </div>

            <div className="flex items-center gap-2 text-[var(--text-primary)]">
              <p>قیمت:</p>
              <p>{post.amount?.toLocaleString("fa-IR")} تومان</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Desktop hover overlay */}
      {onDelete && (
        <>
          <div className="absolute inset-0 hidden items-center justify-center gap-5 bg-[var(--bg-primary)]/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 md:flex">
            <Link
              to={`/posts/${post._id}`}
              className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm text-white transition hover:bg-[var(--color-primary-hover)]"
            >
              <FaEye />
              جزئیات محصول
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] px-5 py-3 text-sm text-[var(--color-primary)] transition hover:bg-[var(--bg-secondary)]"
            >
              <FaTrash />
              حذف آگهی
            </button>
          </div>

          {/* Mobile menu */}
          <div className="absolute left-5 top-5 z-20 md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="عملیات آگهی"
              aria-expanded={menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] shadow-sm"
            >
              <FaEllipsis />
            </button>

            {menuOpen && (
              <div className="absolute left-0 top-11 z-30 min-w-40 overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-lg">
                <Link
                  to={`/posts/${post._id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]"
                >
                  <FaEye />
                  جزئیات محصول
                </Link>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[var(--color-primary)] hover:bg-[var(--bg-tertiary)]"
                >
                  <FaTrash />
                  حذف آگهی
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PostItems;
