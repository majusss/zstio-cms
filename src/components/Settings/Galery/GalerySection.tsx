import { toastError, toastSuccess } from "@/lib/toasting";
import { File } from "@/types/File";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import GaleryImage from "./GalertImage";

export default function GalerySection() {
  const [isGaleryShown, setIsGaleryShown] = useState<boolean | null>(null);
  const [galeryImages, setGaleryImages] = useState<File[] | null>(null);

  const getData = useCallback(async () => {
    try {
      const request = await axios.get("/api/galery");

      setIsGaleryShown(request.data.galery.show);
      setGaleryImages(request.data.galery.images);
    } catch (error) {
      toastError("Wystąpił błąd podczas poierania danych");
      console.error(error);
    }
  }, []);

  const updateData = async () => {
    try {
      await axios.post("/api/galery", {
        showGalery: isGaleryShown,
      });

      await axios.post("/api/uploads", {
        files: galeryImages,
      });

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

  if (isGaleryShown === null || galeryImages === null) {
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
      <h1 className="bold text-lg">Galery</h1>
      <div className="mb-2">
        {galeryImages.length !== 0 ? (
          <div className="grid grid-cols-imgs gap-2">
            {galeryImages
              .sort((a, b) => a.id.localeCompare(b.id))
              .map((image) => (
                <GaleryImage
                  key={image.id}
                  image={image}
                  updateImage={(newImage) => {
                    setGaleryImages((prev) => {
                      return prev!.map((img) =>
                        img.id === newImage.id ? newImage : img,
                      );
                    });
                  }}
                />
              ))}
          </div>
        ) : (
          <div className="w-full text-center p-2 my-1 bg-[#181818] rounded-lg">
            BRAK PLIKOW DO WYSWIETLENIA
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
        <label className="relative h-fit inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isGaleryShown}
            onChange={(e) => setIsGaleryShown(e.target.checked)}
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
