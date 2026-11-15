import { FaLocationDot } from "react-icons/fa6";
import { baseUrl } from "../../constant/baseUrl";
import { formatPersianDate } from "../../utils/formatPersianDate";

function PostItems({ post }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[var(--border-color)] p-4 md:flex-row md:gap-x-5">
      <img
        src={
          post.images?.[0] ? `${baseUrl}/${post.images[0]}` : "/placeholder.png"
        }
        alt={post.options.title}
        className="h-[250px] w-full rounded-lg object-cover md:h-[200px] md:w-[200px]"
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

        <div className="space-y-4">
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
    </div>
  );
}

export default PostItems;
