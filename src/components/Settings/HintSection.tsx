import { toastError, toastSuccess } from "@/lib/toasting";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HintSection() {
  const getData = async () => {
    try {
      const request = await axios.get("/api/hint");

      setIsHintShown(request.data.hint.show);
      setHintText(request.data.hint.text);
    } catch (error) {
      toastError("Wystąpił błąd podczas poierania danych");
      console.error(error);
    }
  };

  const [isHintShown, setIsHintShown] = useState<boolean | null>(null);
  const [hintText, setHintText] = useState<string | null>(null);

  const updateData = async () => {
    try {
      await axios.post("/api/hint", {
        hintText,
        showHint: isHintShown,
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

  if (isHintShown === null || hintText === null) {
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
      <h1 className="bold text-lg">Hint</h1>
      <div className="flex mb-2">
        <input
          type="text"
          value={hintText}
          onChange={(e) => setHintText(e.target.value)}
          className="py-3 mr-2 max-h-24 px-4 block w-full text-gray-50 bg-[#191919] caret-white border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        />
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isHintShown}
            onChange={(e) => setIsHintShown(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[13px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Pokazane
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
