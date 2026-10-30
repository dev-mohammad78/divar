import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { deleteCategory, getCategory } from "../../services/admin";
import Loader from "../Loader";
import { FaRegTrashCan } from "react-icons/fa6";

function CategoryList() {
  const { isPending, data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  console.log(data?.data);
  console.log(data?.data?.map((item) => item.id));

  return (
    <div>
      {isPending ? (
        <Loader />
      ) : (
        <div className="p-3 md:p-5">
          <p className="my-4 text-lg">دسته‌بندی‌های موجود</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto content-start max-h-[500px] mt-8">
            {data.data.map((item) => (
              <CategoryItem key={item._id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList;

function CategoryItem({ item }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-categories"],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="p-3 border border-[var(--border-color)] rounded-md">
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex gap-x-3">
          <img src={`${item.icon}.svg`} alt={item.name} />
          <p>{item.name}</p>
        </div>

        <button
          type="button"
          disabled={isPending}
          onClick={() => mutate(item._id)}
          className={`transition-opacity ${
            isPending ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:text-[var(--color-primary)]"
          }`}
        >
          <FaRegTrashCan size={20} />
        </button>
      </div>
    </div>
  );
}
