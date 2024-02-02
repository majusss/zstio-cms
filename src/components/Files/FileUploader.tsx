import { toastError, toastSuccess } from "@/lib/toasting";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

export default function FileUploader({
  image,
  blob,
  setSelectedImages,
}: {
  image: File;
  blob: string;
  setSelectedImages: Dispatch<
    SetStateAction<
      {
        file: File;
        blob: string;
      }[]
    >
  >;
}) {
  const [name, setName] = useState(image.name);
  const [progrss, setProgrss] = useState<number | null>(null);
  const form = new FormData();
  form.append("file", image);
  form.append("name", name);
  return (
    <div className="flex flex-col border-2 rounded-lg border-white w-52 h-52 bg-[#202020]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={blob} alt="" className="aspect-video" />
      {progrss == null ? (
        <>
          <input
            type="search"
            id="default-search"
            className="mt-2 px-1 w-full h-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="flex w-full h-full items-center py-2">
            <div className="w-full inline-flex justify-center items-center">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={async () => {
                  try {
                    await axios.put("/api/uploads", form, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                      onUploadProgress: (e) => {
                        setProgrss(
                          Math.round((e.loaded * 100) / (e?.total || 0)),
                        );
                      },
                    });
                    toastSuccess("Plik został dodany");
                  } catch (error) {
                    toastError("Nie udało się dodać pliku");
                  }

                  setSelectedImages((pre: { file: File; blob: string }[]) => {
                    return pre.filter((img) => img.blob !== blob);
                  });
                }}
              >
                SAVE
              </button>
              <button
                type="button"
                onClick={() =>
                  setSelectedImages((pre: { file: File; blob: string }[]) => {
                    return pre.filter((img) => img.blob !== blob);
                  })
                }
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                CANCEL
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: progrss * 2 }}
          >
            {progrss}%
          </div>
        </div>
      )}
    </div>
  );
}
