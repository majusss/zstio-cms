import { toast } from "react-toastify";

const options: any = {
  position: "bottom-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  closeButton: false,
  progress: undefined,
  className: "!bg-gray-50 dark:!bg-gray-800 dark:!text-gray-300 !text-gray-700",
};

export const toastError = (message: string) => {
  toast.error(message, options);
};

export const toastSuccess = (message: string) => {
  toast.success(message, options);
};

export const toastInfo = (message: string) => {
  toast.info(message, options);
};
