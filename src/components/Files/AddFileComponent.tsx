import { ArrowUpOnSquareIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function AddFileComponent({
  isDragActive,
}: {
  isDragActive: boolean;
}) {
  return (
    <div className="border-2 rounded-lg border-white w-52 h-52 flex bg-[#202020] justify-center items-center transition-colors hover:bg-[#181818]">
      {isDragActive ? (
        <ArrowUpOnSquareIcon className="w-28 h-28 rounded-full bg-[#121212] p-2" />
      ) : (
        <PlusIcon className="w-28 h-28 rounded-full bg-[#121212] p-2" />
      )}
    </div>
  );
}
