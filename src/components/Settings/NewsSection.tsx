import { toastError, toastSuccess } from "@/lib/toasting";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewsSection() {
  const [isNewsShown, setIsNewsShown] = useState<boolean | null>(null);
  const [newsArticles, setNewsArticles] = useState<[] | null>(null);

  const getData = async () => {
    try {
      const request = await axios.get("/api/news");

      setIsNewsShown(request.data.news.show);
      setNewsArticles(request.data.news.articles);
    } catch (error) {
      toastError("Wystąpił błąd podczas poierania danych");
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      const request = await axios.post("/api/news", {
        showNews: isNewsShown,
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

  if (isNewsShown === null || newsArticles === null) {
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
      <h1 className="bold text-lg">News</h1>
      <div className="mb-2">
        <div className="grid grid-cols-imgs gap-2">
          {newsArticles.map((article: any, index: number) => (
            <div
              key={index}
              className="w-full h-full flex justify-center items-center bg-[#181818] rounded-lg bg-center bg-cover"
              style={
                article.img ? { backgroundImage: `url(${article.img})` } : {}
              }
            >
              <p className="text-sm text-center w-fit h-fit p-2 drop-shadow-[0_0_1px_rgba(0,0,0,1)]">
                {article.title}
              </p>
            </div>
          ))}
        </div>
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
            checked={isNewsShown}
            onChange={(e) => setIsNewsShown(e.target.checked)}
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
