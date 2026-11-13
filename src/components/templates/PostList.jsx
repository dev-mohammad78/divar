import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaLocationDot } from "react-icons/fa6";

import { getPosts } from "../../services/user";
import { getCategory } from "../../services/admin";
import { formatPersianDate } from "../../utils/formatPersianDate";
import PostFilters from "../common/PostFilters";
import Loader from "../Loader";

function PostList() {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState("");

  const { data: categoriesData } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const { data, isPending } = useQuery({
    queryKey: ["my-post-list", sort, category],
    queryFn: () => getPosts({ sort, category }),
  });

  return (
    <div className="p-1 sm:p-6 mt-2">
      {/* post filter */}
      <PostFilters
        sort={sort}
        setSort={setSort}
        category={category}
        setCategory={setCategory}
        categories={categoriesData?.data || []}
      />

      {isPending ? (
        <Loader fullScreen={false} />
      ) : (
        <div>
          {data?.posts?.length === 0 ? (
            <div className="col-span-full flex justify-center items-center py-16">
              <p className="text-[var(--text-secondary)] text-base">
                آگهی‌ای در این دسته‌بندی وجود ندارد.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {data?.posts?.map((post) => (
                <div
                  key={post._id}
                  className="flex flex-col md:flex-row gap-x-5 p-4 border border-[var(--border-color)] rounded-lg"
                >
                  <img
                    src={`${baseUrl}/${post.images[0]}`}
                    alt={post.options.title}
                    className="w-full md:w-[200px] h-[300px] md:h-[200px]  object-center rounded-lg"
                  />

                  {/* details */}
                  <div className="flex flex-col gap-6 mt-2 p-2">
                    <div className="space-y-3">
                      <h1 className="text-lg font-bold">
                        {post.options.title}
                      </h1>
                      <p className="text-sm md:text-base text-[var(--text-secondary)]">
                        {post.options.content}
                      </p>
                      <div className="flex gap-2 items-center">
                        <FaLocationDot className="text-[var(--color-primary)]" />
                        <p>{post.options.city}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <p className="text-[var(--text-secondary)] text-sm">
                          تاریخ انتشار:
                        </p>
                        <p className="text-[var(--text-secondary)] text-sm">
                          {formatPersianDate(post.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p>قیمت:</p>
                        <p>{post.amount.toLocaleString("fa-IR")} تومان</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostList;
