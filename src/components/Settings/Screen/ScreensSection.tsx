import { toastError, toastSuccess } from "@/lib/toasting";
import { Screen } from "@/types/Screen";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ScreenPreview from "./ScreenPreview";

export default function ScreensSection() {
  const [screens, setScreens] = useState<Screen[] | null>(null);

  const getData = useCallback(async () => {
    try {
      const request = await axios.get("/api/screen");

      setScreens(request.data.screens);
    } catch (error) {
      toastError("Wystąpił błąd podczas poierania danych");
      console.error(error);
    }
  }, []);

  const updateData = async () => {
    try {
      await axios.post("/api/screen", { screens });

      toastSuccess("Zaktualizowano dane");
    } catch (error) {
      toastError("Wystąpił błąd podczas aktualizacji danych");
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (screens === null) {
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
      <h1 className="bold text-lg">Ekrany</h1>
      <div className="mb-2">
        {screens.length !== 0 ? (
          <div className="grid grid-cols-imgs gap-2">
            {screens
              .sort((a, b) => a.index - b.index)
              .map((screen) => (
                <ScreenPreview
                  key={screen.id}
                  screen={screen}
                  moveLeft={() => {
                    const indexToMove = screen.index;
                    if (indexToMove >= 1 && indexToMove < screens.length) {
                      const tempScreens = screens.map((s) => ({ ...s }));
                      tempScreens[indexToMove].index = indexToMove - 1;
                      tempScreens[indexToMove - 1].index = indexToMove;
                      setScreens(tempScreens);
                    }
                  }}
                  moveRight={() => {
                    const indexToMove = screen.index;
                    if (indexToMove >= 0 && indexToMove < screens.length - 1) {
                      const tempScreens = screens.map((s) => ({ ...s }));
                      tempScreens[indexToMove].index = indexToMove + 1;
                      tempScreens[indexToMove + 1].index = indexToMove;
                      setScreens(tempScreens);
                    }
                  }}
                  updateScreen={(newScreen) => {
                    setScreens((screens) =>
                      screens!.map((s) => {
                        if (s.id === newScreen.id) {
                          return newScreen;
                        }
                        return s;
                      }),
                    );
                  }}
                />
              ))}
          </div>
        ) : (
          <div className="w-full text-center p-2 my-1 bg-[#181818] rounded-lg">
            BRAK EKRANÓW DO WYSWIETLENIA
          </div>
        )}
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={updateData}
          className="inline-flex mr-2 justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-blue-100 text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Aktualizuj
        </button>
      </div>
    </div>
  );
}
