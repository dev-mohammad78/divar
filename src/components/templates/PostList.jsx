import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "../../services/user";
import { getCategory } from "../../services/admin";
import PostFilters from "../common/PostFilters";
import Loader from "../Loader";
import PostItems from "./PostItems";

function PostList() {
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
                <PostItems key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostList;
