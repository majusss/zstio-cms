import { toastError, toastSuccess } from "@/lib/toasting";
import axios from "axios";
import { useState } from "react";

export default function GaleryImage({
  id,
  title: titleImg,
  img,
  shown: showImg,
  updateHostedImgs,
}: {
  id: string;
  title: string;
  img: string;
  shown: boolean;
  updateHostedImgs: () => void;
}) {
  const [title, setTitle] = useState(titleImg);
  const [show, setShow] = useState(showImg);
  const [progrss, setProgrss] = useState<number | null>(null);
  return (
    <div className="flex flex-col rounded-lg w-52 h-52 bg-[#181818]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img} alt="" className="aspect-video" />
      <>
        <input
          type="search"
          id="default-search"
          className="mt-2 px-1 w-full h-full text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <div className="flex w-full h-full items-center py-2">
          <div className="w-full inline-flex justify-center items-center">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 me-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={async () => {
                try {
                  await axios.patch("/api/uploads", { id, title, show });
                  toastSuccess("Plik został zaktualizowany");
                } catch (error) {
                  toastError("Nie udało się zaktualizowac pliku");
                }

                updateHostedImgs();
              }}
            >
              UPDATE
            </button>
            <label className="relative h-fit inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={show}
                onChange={(e) => setShow(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                Pokazane
              </span>
            </label>
          </div>
        </div>
      </>
    </div>
  );
}
