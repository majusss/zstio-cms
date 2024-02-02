import { Screen } from "@/types/Screen";
import { useEffect, useState } from "react";

export default function ScreenPreview({
  screen,
  moveLeft,
  moveRight,
  updateScreen,
}: {
  screen: Screen;
  moveLeft: () => void;
  moveRight: () => void;
  // eslint-disable-next-line no-unused-vars
  updateScreen: (newScreen: Screen) => void;
}) {
  const [title, setTitle] = useState(screen.title);
  const [time, setTime] = useState(screen.displayTimeSeconds);
  const [show, setShow] = useState(screen.show);

  useEffect(() => {
    updateScreen({
      id: screen.id,
      index: screen.index,
      title,
      displayTimeSeconds: time,
      show,
    });
  }, [screen.id, screen.index, show, time, title, updateScreen]);

  return (
    <div className="flex flex-col rounded-lg w-52 h-52 bg-[#181818]">
      <div className="flex flex-col justify-center items-center mt-2">
        <p>{screen.id}</p>
        <div className="inline-flex">
          <button onClick={moveLeft} className="bg-[#202020] rounded-lg px-1">
            {"<"}
          </button>
          <p className="px-4">{screen.index}</p>
          <button onClick={moveRight} className="bg-[#202020] rounded-lg px-1">
            {">"}
          </button>
        </div>
      </div>
      <input
        type="search"
        className="mt-2 px-1 w-full h-full text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="number"
        className="mt-2 px-1 w-full h-full text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={time}
        onChange={(e) => {
          setTime(+e.target.value);
        }}
      />
      <div className="flex w-full h-full items-center py-2">
        <div className="w-full inline-flex justify-center items-center">
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
    </div>
  );
}
