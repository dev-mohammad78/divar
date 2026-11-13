import { useQuery } from "@tanstack/react-query";
import { getLatestPosts } from "../../services/post";
import PostItems from "./PostItems";

const LatestPosts = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["latest-posts"],
    queryFn: getLatestPosts,
  });

  const posts = data?.posts || [];

  if (isPending) return null;

  if (isError) {
    return (
      <p className="py-10 text-center text-[var(--text-secondary)]">
        دریافت آگهی‌ها ناموفق بود.
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 lg:px-10">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--text-primary)] md:text-2xl">
          جدیدترین آگهی‌ها
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          تازه‌ترین آگهی‌های ثبت‌شده را ببینید.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {data?.posts?.map((post) => (
          <PostItems key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
