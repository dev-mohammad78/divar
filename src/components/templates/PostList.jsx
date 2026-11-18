import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deletePost, getPosts, getProfile } from "../../services/user";
import { getCategory } from "../../services/admin";
import PostFilters from "../common/PostFilters";
import Loader from "../Loader";
import PostItems from "./PostItems";
import toast from "react-hot-toast";

function PostList() {
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState("");

  const { data: categoriesData } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const isAdmin = profile?.data?.role === "ADMIN";

  const { data, isPending } = useQuery({
    queryKey: ["my-post-list", isAdmin, sort, category],
    queryFn: () => getPosts({ sort, category }),
  });

  const queryClient = useQueryClient();

  const { mutate: removePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("آگهی با موفقیت حذف شد");
      queryClient.invalidateQueries({
        queryKey: ["my-post-list"],
      });
    },
    onError: () => {
      toast.error("حذف آگهی انجام نشد");
    },
  });

  return (
    <div className="p-1 sm:p-6 mt-2">
      {/* post filter */}
      <div className="py-4">
        <PostFilters
          sort={sort}
          setSort={setSort}
          category={category}
          setCategory={setCategory}
          categories={categoriesData?.data || []}
        />
      </div>

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
                <PostItems
                  key={post._id}
                  post={post}
                  onDelete={(id) => {
                    const confirmDelete = window.confirm(
                      "آیا از حذف این آگهی مطمئن هستید؟",
                    );

                    if (confirmDelete) {
                      removePost(id);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PostList;
