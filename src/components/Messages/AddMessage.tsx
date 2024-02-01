import { toastError, toastSuccess } from "@/lib/toasting";
import { MessageType, MessageTypeDisplay } from "@/types/Message";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Fragment, useState } from "react";

const messageTypes: { value: MessageType }[] = [
  { value: "INFO" },
  { value: "WARNING" },
  { value: "ERROR" },
  { value: "SILENT" },
  { value: "UPDATE" },
];

const messageDisplayTypes: { value: MessageTypeDisplay }[] = [
  { value: "POPUP" },
  { value: "BANNER" },
];

function AddMessage({ reloadData }: { reloadData: () => Promise<void> }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDisplayType, setSelectedDisplayType] = useState(
    messageDisplayTypes[0],
  );
  const [selectedMessageType, setSelectedMessageType] = useState(
    messageTypes[0],
  );
  const [message, setMessage] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState("");
  const [hourFrom, setHourFrom] = useState("");
  const [hourTo, setHourTo] = useState("");
  const [inAction, setInAction] = useState(false);

  const closeModal = () => {
    setMessage("");
    setRedirectUrl("");
    setDisplayUrl("");
    setShowModal(false);
  };

  const addMessage = async () => {
    if (!message || !selectedMessageType || !selectedDisplayType) {
      return toastError("Wypełnij wszystkie pola");
    }

    if ((hourFrom && !hourTo) || (!hourFrom && hourTo)) {
      return toastError("Błędny przedział czasowy");
    }

    setInAction(true);

    try {
      await axios.put("/api/messages", {
        message,
        type: selectedMessageType.value,
        displayType: selectedDisplayType.value,
        toUrl: displayUrl,
        redirectUrl,
        displayTime:
          hourFrom && hourTo
            ? {
                from: new Date(
                  new Date().setHours(
                    +hourFrom.split(":")[0],
                    +hourFrom.split(":")[1],
                  ),
                ).toISOString(),
                to: new Date(
                  new Date().setHours(
                    +hourTo.split(":")[0],
                    +hourTo.split(":")[1],
                  ),
                ).toISOString(),
              }
            : null,
      });
      setInAction(false);
      closeModal();
      reloadData();
      toastSuccess("Dodano wiadomość");
    } catch (error) {
      setInAction(false);
      toastError(
        "Wystąpił błąd podczas dodawania wiadomości (sprawdź konsolę)",
      );
      console.error(error);
    }
  };
  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#121212] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-50"
                  >
                    Dodaj wiadomość
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea
                      className="py-3 mb-2 max-h-24 px-4 block w-full text-gray-50 bg-[#191919] caret-white border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      rows={3}
                      placeholder="Tutaj napisz wiadomość"
                      onChange={(e) => {
                        setMessage(e.currentTarget.value);
                      }}
                    ></textarea>
                    <div className="flex justify-around mb-2">
                      <Listbox
                        value={selectedDisplayType}
                        onChange={setSelectedDisplayType}
                      >
                        <div className="relative mt-1 w-1/2 mr-1">
                          <Listbox.Button className="relative w-full text-gray-50 cursor-pointer rounded-lg bg-[#191919] py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selectedDisplayType.value}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-20 w-full overflow-auto rounded-md bg-[#191919] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {messageDisplayTypes.map((type, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-50"
                                    }`
                                  }
                                  value={type}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {type.value}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                      <Listbox
                        value={selectedMessageType}
                        onChange={setSelectedMessageType}
                      >
                        <div className="relative mt-1 w-1/2 ml-1">
                          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-[#191919] text-gray-50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">
                              {selectedMessageType.value}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-20 w-full overflow-auto rounded-md bg-[#191919] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                              {messageTypes.map((type, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-amber-100 text-amber-900"
                                        : "text-gray-50"
                                    }`
                                  }
                                  value={type}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {type.value}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                          <CheckIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>

                    <input
                      type="text"
                      className="py-3 mb-2 px-4 block w-full border-[#191919] bg-[#191919] text-gray-50 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="URL przekierowania (opcjonalnie)"
                      onChange={(e) => {
                        setRedirectUrl(e.currentTarget.value);
                      }}
                    />

                    <input
                      type="text"
                      className="py-3 px-4 block w-full border-[#191919] bg-[#191919] text-gray-50 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="URL wyświetlania (opcjonalnie)"
                      onChange={(e) => {
                        setDisplayUrl(e.currentTarget.value);
                      }}
                    />

                    <div className="flex justify-between flex-col">
                      <p className="text-gray-300 ml-1">
                        Czas wyświetlania (opcjonalnie)
                      </p>
                      <div className="flex">
                        <div className="mt-1 w-1/2 mr-1">
                          <input
                            type="time"
                            className="py-3 mb-2 px-4 block w-full border-[#191919] bg-[#191919] text-gray-50 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Od (HH:MM)"
                            onChange={(e) => {
                              setHourFrom(e.currentTarget.value);
                            }}
                          />
                        </div>
                        <div className="mt-1 w-1/2 ml-1">
                          <input
                            type="time"
                            className="py-3 mb-2 px-4 block w-full border-[#191919] bg-[#191919] text-gray-50 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Do (HH:MM)"
                            onChange={(e) => {
                              setHourTo(e.currentTarget.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      disabled={inAction}
                      type="button"
                      onClick={addMessage}
                      className="inline-flex mr-2 justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-blue-100  text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Dodaj
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-red-100 text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal();
                      }}
                    >
                      Anuluj
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="absolute z-40 right-2 bottom-2">
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          <PlusIcon className="w-8 h-8" />
        </button>
      </div>
    </>
  );
}

export default AddMessage;
