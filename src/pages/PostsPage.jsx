import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPosts } from "../services/post";

import Loader from "../components/Loader";
import PostItems from "../components/templates/PostItems";

const PostsPage = () => {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");

  const { data, isPending, isError } = useQuery({
    queryKey: ["posts", category],
    queryFn: () => getPosts({ category }),
  });

  const posts = data?.posts || [];

  return (
    <main className="min-h-screen px-4 py-10 lg:px-10">
      <h1 className="mb-8 text-2xl font-bold text-[var(--text-primary)]">
        {category ? "آگهی‌های دسته‌بندی انتخاب‌شده" : "همه آگهی‌ها"}
      </h1>

      {isPending ? (
        <Loader fullScreen={false} />
      ) : isError ? (
        <p className="py-10 text-center text-[var(--text-secondary)]">
          دریافت آگهی‌ها ناموفق بود.
        </p>
      ) : posts.length === 0 ? (
        <p className="py-10 text-center text-[var(--text-secondary)]">
          آگهی‌ای پیدا نشد.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {posts.map((post) => (
            <PostItems key={post._id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
};

export default PostsPage;
