import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/admin";
import Loader from "../Loader";
import { FaRegTrashCan } from "react-icons/fa6";

function CategoryList() {
  const { isPending, data } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });

  console.log({ isPending, data });

  return (
    <div>
      {isPending ? (
        <Loader />
      ) : (
        <div className="p-3 md:p-5">
          <p className="my-4 text-lg">دسته‌بندی‌های موجود</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto content-start max-h-[500px] mt-8">
            {data.data.map((item) => (
              <CategoryItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryList;

function CategoryItem({ item }) {
  return (
    <div className="p-3 border border-[var(--border-color)] rounded-md">
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex gap-x-3">
          <img src={`${item.icon}.svg`} alt={item.name} />
          <p>{item.name}</p>
        </div>

        <button>
          <FaRegTrashCan size={20} />
        </button>
      </div>
    </div>
  );
}
