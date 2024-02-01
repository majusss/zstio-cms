import { toastError, toastSuccess } from "@/lib/toasting";
import Message from "@/types/Message";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import AddMessage from "./AddMessage";
import DeleteMessage from "./DeleteMessage";

export default function MessagesHandler() {
  const [data, setData] = useState<Message[] | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [wantToDelete, setWantToDelete] = useState<string | undefined>("");

  const getData = async () => {
    try {
      const request = await axios.get("/api/messages?force=true");

      setData(request.data.messages);
    } catch (error) {
      toastError("Wystąpił błąd podczas poierania danych");
      console.error(error);
    }
  };

  const prepareDelete = (id: string | undefined) => {
    setWantToDelete(id);
    setDeleteModal(true);
  };

  const changeVisibility = async (
    id: string | undefined,
    visibility: boolean,
  ) => {
    try {
      const req = await axios.patch("/api/messages", {
        id,
        published: visibility,
      });

      toastSuccess("Zmieniono widoczność wiadomości");
      getData();
    } catch (error) {
      toastError("Wystąpił błąd podczas zmiany widoczności wiadomości");
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <AddMessage reloadData={getData} />
      <DeleteMessage
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}
        id={wantToDelete}
        reloadData={getData}
      />
      <div className="text-white w-full">
        <div className="w-full bg-[#121212] text-center sticky">
          <h1 className="text-xl p-2 font-semibold">
            ZARZĄDZANIE WIADOMOŚCIAMI
          </h1>
        </div>

        {data == null ? (
          <div className="w-full h-screen flex justify-center items-center">
            <span
              className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-white rounded-full"
              role="status"
              aria-label="loading"
            >
              <span className="sr-only">Loading...</span>
            </span>
          </div>
        ) : (
          <>
            {!!data.length ? (
              <div className="hs-accordion-group">
                {data?.map((message: Message) => (
                  <div key={message.id} className="mx-4 my-2">
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={`flex w-full justify-between rounded-lg bg-[#202020] p-4 text-left text-sm font-medium hover:bg-[#181818] ${
                              open ? "text-indigo-500" : "text-gray-50"
                            }`}
                          >
                            <p>
                              <span className="text-gray-300">
                                {message.id} -{" "}
                              </span>

                              {message.message}
                            </p>
                            <ChevronUpIcon
                              className={`${
                                open ? "rotate-180 transform" : ""
                              } h-5 w-5 text-gray-100`}
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="px-4 pb-2 overflow-x-scroll bg-[#121212] rounded-lg mt-2 pt-4 text-sm text-gray-500">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead>
                                <tr>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-bold text-indigo-600 uppercase"
                                  >
                                    OPUBLIKOWANY
                                  </th>

                                  {message.displayTime && (
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-start text-xs font-bold text-indigo-600 uppercase"
                                    >
                                      OKRES WYŚWIETLANIA
                                    </th>
                                  )}
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-bold text-indigo-600 uppercase"
                                  >
                                    TYP
                                  </th>
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-start text-xs font-bold text-indigo-600 uppercase"
                                  >
                                    TYP WYŚWIETLANIA
                                  </th>
                                  {message.redirectUrl && (
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-start text-xs font-bold text-indigo-600 uppercase"
                                    >
                                      PRZEKIEROWANIE NA
                                    </th>
                                  )}

                                  {message.toUrl && (
                                    <th
                                      scope="col"
                                      className="px-6 py-3 text-start text-xs font-bold text-indigo-600 uppercase"
                                    >
                                      WYŚWIETLONE NA
                                    </th>
                                  )}
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-end  text-xs font-bold text-indigo-600 uppercase"
                                  >
                                    AKCJA
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {message.published ? "TAK" : "NIE"}
                                  </td>
                                  {message.displayTime && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {message.displayTime.from} -{" "}
                                      {message.displayTime.to}
                                    </td>
                                  )}
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {message.type}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {message.displayType}
                                  </td>
                                  {message.redirectUrl && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {message.redirectUrl}
                                    </td>
                                  )}
                                  {message.toUrl && (
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                      {message.toUrl}
                                    </td>
                                  )}
                                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                    <div className="flex flex-col items-end">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          prepareDelete(message.id)
                                        }
                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400"
                                      >
                                        Usuń
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          changeVisibility(
                                            message.id,
                                            !message.published,
                                          )
                                        }
                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-indigo-600 hover:text-indigo-800 disabled:opacity-50 disabled:pointer-events-none dark:text-indigo-500 dark:hover:text-indigo-400"
                                      >
                                        {message.published ? "Ukryj" : "Pokaż"}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-screen flex justify-center items-center">
                <h1 className="font-semibold text-lg tracking-wider">
                  Znaleziono 0 wiadomości
                </h1>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
