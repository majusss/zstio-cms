import { File } from "@/types/File";
import { useEffect, useState } from "react";

export default function GaleryImage({
  image,
  updateImage,
}: {
  image: File;
  // eslint-disable-next-line no-unused-vars
  updateImage: (newImage: File) => void;
}) {
  const [title, setTitle] = useState(image.title);
  const [show, setShow] = useState(image.shown);
  useEffect(() => {
    updateImage({
      id: image.id,
      title,
      deleteHash: image.deleteHash,
      url: image.url,
      shown: show,
    });
  }, [image.id, show, title, updateImage, image.url, image.deleteHash]);
  return (
    <div className="flex flex-col rounded-lg w-52 h-52 bg-[#181818]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.url} alt="" className="aspect-video" />
      <input
        type="search"
        id="default-search"
        className="mt-2 px-1 w-full h-full text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <div className="flex w-full h-full items-center justify-center py-2">
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
  );
}
