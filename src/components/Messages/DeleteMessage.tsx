import { toastError, toastSuccess } from "@/lib/toasting";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Dispatch, Fragment, SetStateAction, useState } from "react";

function DeleteMessage({
  isOpen,
  setIsOpen,
  reloadData,
  id,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  reloadData: () => Promise<void>;
  id?: string;
}) {
  const [inAction, setInAction] = useState(false);

  const deleteMessage = async () => {
    setInAction(true);
    try {
      await axios.delete(`/api/messages`, {
        data: {
          id,
        },
      });
      setInAction(false);
      setIsOpen(false);
      reloadData();
      toastSuccess("Wiadomość została usunięta");
    } catch (error) {
      setInAction(false);
      toastError("Wystąpił błąd podczas usuwania wiadomości (sprawdź konsolę)");
      console.error(error);
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
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
                  Czy na pewno chcesz usunąć tę wiadomość?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-100">
                    Twoja wiadomość zostanie usunięta na zawsze. Ta akcja jest
                    nieodwracalna.
                  </p>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    disabled={inAction}
                    type="button"
                    className="inline-flex mr-2 justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={deleteMessage}
                  >
                    Usuń
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      setIsOpen(false);
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
  );
}

export default DeleteMessage;
