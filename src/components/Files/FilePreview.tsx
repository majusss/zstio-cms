import { toastError, toastSuccess } from "@/utils/toasting";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function FilePreview({
  name,
  img,
  id,
}: {
  name: string;
  img: string;
  id: string;
}) {
  return (
    <div className="flex flex-col border-2 rounded-lg border-white w-52 h-52 bg-[#202020] justify-around">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <a href={img}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt="" className="aspect-video" />
      </a>
      <div className="flex items-center justify-center w-full align-middle h-14">
        <p className="text-xs max-h-full break-all m-2 overflow-y-auto text-center ">
          {name}
        </p>
        <div className="flex justify-center items-center ">
          <button
            type="button"
            onClick={async () => {
              try {
                await axios.delete(`/api/uploads?id=${id}`);
                toastSuccess("Plik został usunięty");
              } catch (error) {
                toastError("Nie udało się usunąć pliku");
              }
            }}
            className="m-2 p-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
