import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { getCookie } from "../../utils/cookies";
import { getCategory } from "../../services/admin";
import formatNumber from "../../utils/formatNumber";
import CustomSelect from "../common/CustomSelect";

function AddPost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    amount: "",
    city: "",
    category: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const previews = form.images.map((image) => URL.createObjectURL(image));

    setImagePreviews(previews);

    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [form.images]);

  const { data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  const changeHandler = (event) => {
    const name = event.target.name;

    if (name !== "images") {
      setForm((prev) => ({
        ...prev,
        [name]: event.target.value,
      }));
    } else {
      const files = Array.from(event.target.files).slice(0, 4);

      setForm((prev) => ({
        ...prev,
        images: files,
      }));
    }
  };

  const addHandler = async (event) => {
    event.preventDefault();

    if (
      !form.title.trim() ||
      !form.content.trim() ||
      !form.amount ||
      !form.city.trim() ||
      !form.category ||
      !form.images.length
    ) {
      toast.error("لطفاً تمام فیلدها را تکمیل کنید.");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("amount", form.amount.replace(/,/g, ""));
    formData.append("city", form.city);
    formData.append("category", form.category);

    form.images.forEach((image) => {
      formData.append("images", image);
    });

    const token = getCookie("accessToken");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/post/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(response.data);
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  const removeImageHandler = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={addHandler}
      className="grid grid-cols-1 gap-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 shadow-sm sm:grid-cols-2 sm:p-6 mt-6 md:max-w-6xl mx-auto"
    >
      {/* title */}
      <div className="sm:col-span-2">
        <label
          htmlFor="title"
          className="mb-2 block text-base font-medium text-[var(--text-primary)]"
        >
          عنوان آگهی
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="مثلاً آپارتمان ۸۰ متری در تهران"
          className="input-style"
        />
      </div>

      {/* description */}
      <div className="sm:col-span-2">
        <label
          htmlFor="content"
          className="mb-2 block text-base font-medium text-[var(--text-primary)]"
        >
          توضیحات آگهی
        </label>
        <textarea
          id="content"
          name="content"
          rows={5}
          placeholder="توضیحات کامل آگهی خود را وارد کنید..."
          className="input-style resize-y"
        />
      </div>

      {/* category */}
      <div className="sm:col-span-2">
        <label className="mb-2 block text-base font-medium text-[var(--text-primary)]">
          دسته‌بندی آگهی
        </label>

        <CustomSelect
          options={
            data?.data?.map((item) => ({
              value: item._id,
              label: item.name,
            })) || []
          }
          value={form.category}
          onChange={(value) =>
            setForm((prev) => ({
              ...prev,
              category: value,
            }))
          }
          placeholder="دسته‌بندی موردنظر را انتخاب کنید"
        />
      </div>

      {/* price */}
      <div>
        <label
          htmlFor="amount"
          className="mb-2 block text-base font-medium text-[var(--text-primary)]"
        >
          قیمت (تومان)
        </label>
        <input
          type="text"
          inputMode="numeric"
          id="amount"
          name="amount"
          placeholder="مثلاً ۱۵,۰۰۰,۰۰۰"
          className="input-style"
          value={formatNumber(form.amount)}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");

            setForm((prev) => ({
              ...prev,
              amount: value,
            }));
          }}
        />
      </div>

      {/* city */}
      <div>
        <label
          htmlFor="city"
          className="mb-2 block text-base font-medium text-[var(--text-primary)]"
        >
          شهر
        </label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="نام شهر را وارد کنید"
          className="input-style"
        />
      </div>

      {/* images */}
      <div className="sm:col-span-2">
        <label
          htmlFor="images"
          className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-[var(--border-color)] bg-[var(--bg-tertiary)] p-8 text-center transition hover:border-[var(--color-primary)]"
        >
          <span className="text-base font-medium text-[var(--text-primary)]">
            انتخاب تصاویر آگهی
          </span>

          <span className="text-sm text-[var(--text-secondary)]">
            حداکثر ۴ تصویر با فرمت JPG، PNG یا WebP
          </span>

          <span className="rounded-lg bg-[var(--color-primary)] px-5 py-2 text-sm text-white transition hover:bg-[var(--color-primary-hover)]">
            انتخاب فایل
          </span>
        </label>

        <input
          type="file"
          name="images"
          id="images"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={changeHandler}
          className="hidden"
        />

        {form.images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:col-span-2 sm:grid-cols-4 mt-2">
            {form.images.map((image, index) => (
              <div
                key={`${image.name}-${index}`}
                className="relative overflow-hidden rounded-lg border border-[var(--border-color)]"
              >
                <img
                  src={imagePreviews[index]}
                  alt={`تصویر ${index + 1}`}
                  className="h-32 w-full object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImageHandler(index)}
                  className="absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-white transition hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* btn */}
      <button
        type="submit"
        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--text-white)] p-4 rounded-lg w-full sm:col-span-2 transition"
      >
        ثبت آگهی
      </button>
    </form>
  );
}
export default AddPost;
