import { toastError, toastSuccess } from "@/lib/toasting";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DisplaySection() {
  const getData = async () => {
    try {
      const request = await axios.get("/api/settings");

      setIsTimerShown(request.data.settings.showTimer);
      setIsHappyNumberShown(request.data.settings.showHappyNumber);
    } catch (error) {
      toastError("Wystąpił błąd podczas poierania danych");
      console.error(error);
    }
  };

  const [isTimerShown, setIsTimerShown] = useState<boolean | null>(null);
  const [isHappyNumberShown, setIsHappyNumberShown] = useState<boolean | null>(
    null,
  );

  const updateData = async () => {
    try {
      await axios.post("/api/settings", {
        showTimer: isTimerShown,
        showHappyNumber: isHappyNumberShown,
      });

      toastSuccess("Zaktualizowano dane");
    } catch (error) {
      toastError("Wystąpił błąd podczas aktualizacji danych");
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isTimerShown === null || isHappyNumberShown === null) {
    return (
      <div className="rounded-lg bg-[#202020] p-4 flex justify-center items-center mb-4">
        <span
          className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-[#202020] p-4 mb-4">
      <h1 className="bold text-lg">Display</h1>
      <div className="flex mb-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isTimerShown}
            onChange={(e) => setIsTimerShown(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Timer
          </span>
        </label>

        <label className="relative inline-flex items-center cursor-pointer ml-2">
          <input
            type="checkbox"
            checked={isHappyNumberShown}
            onChange={(e) => setIsHappyNumberShown(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Happy Number
          </span>
        </label>
      </div>

      <button
        type="button"
        onClick={updateData}
        className="inline-flex mr-2 justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-blue-100  text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Aktualizuj
      </button>
    </div>
  );
}
