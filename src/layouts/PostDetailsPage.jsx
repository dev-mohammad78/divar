import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getPostById } from "../services/post";
import Loader from "../components/Loader";
import { useState } from "react";
import { baseUrl } from "../constant/baseUrl";
import { formatPersianDate } from "../utils/formatPersianDate";

const PostDetailsPage = () => {
  const [activeImage, setActiveImage] = useState(0);

  const { id } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ["post-details", id],
    queryFn: () => getPostById(id),
    enabled: !!id,
  });

  if (isPending) return <Loader size={64} />;

  if (isError || !data?.post) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-[var(--text-secondary)]">
        دریافت اطلاعات آگهی ناموفق بود.
      </div>
    );
  }

  const post = data.post;
  const images = post.images || [];
  

  return (
    <main className="px-4 py-10 lg:px-10 bg-[var(--bg-tertiary)]">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-3">
          <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
            {images.length > 0 ? (
              <img
                src={`${baseUrl}/${images[activeImage]}`}
                alt={post.options?.title}
                className="h-[300px] w-full object-contain md:h-[450px]"
              />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-[var(--text-secondary)] md:h-[450px]">
                تصویری برای این آگهی ثبت نشده است.
              </div>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={image}
                  onClick={() => setActiveImage(index)}
                  className={`shrink-0 overflow-hidden rounded-lg border-2 ${
                    activeImage === index
                      ? "border-[var(--color-primary)]"
                      : "border-[var(--border-color)]"
                  }`}
                >
                  <img
                    src={`${baseUrl}/${image}`}
                    alt={`تصویر ${index + 1}`}
                    className="h-20 w-24 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Basic Information */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold leading-relaxed text-[var(--text-primary)]">
              {post.options?.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
              <span>{post.options?.city}</span>

              <span>{post.category?.name}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-2 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">
              توضیحات آگهی
            </h2>

            <p className="whitespace-pre-line leading-8 text-[var(--text-secondary)]">
              {post.options?.content || "توضیحاتی برای این آگهی ثبت نشده است."}
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5">
            <p className="text-sm text-[var(--text-secondary)]">قیمت آگهی</p>

            <p className="mt-3 text-2xl font-extrabold text-[var(--color-primary)]">
              {post.amount?.toLocaleString("fa-IR")} تومان
            </p>
          </div>

          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
            <span className="text-sm text-[var(--text-secondary)]">
              تاریخ انتشار
            </span>

            <span className="text-sm font-medium text-[var(--text-primary)]">
              {formatPersianDate(post.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PostDetailsPage;
