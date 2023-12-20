import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const items = [
  {
    name: "Messages",
    icon: EnvelopeIcon,
    path: "/dashboard/messages",
  },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    path: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path
      ? "bg-indigo-600 text-white hover:bg-indigo-700"
      : "text-gray-200";
  };

  return (
    <div className="flex h-screen w-16 flex-col justify-between bg-[#121212]">
      <div>
        <div className="border-t border-[#242424]">
          <div className="px-2">
            <div className="py-4">
              <Link href="/dashboard/start">
                <HomeIcon
                  className={`cursor-pointer relative flex justify-center rounded px-2 py-1.5 hover:text-gray-50 ${isActive(
                    "/dashboard/start"
                  )}`}
                />
              </Link>
            </div>

            <ul className="space-y-1 border-t border-[#242424] pt-4">
              {items.map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    <item.icon
                      className={`cursor-pointer relative flex justify-center rounded px-2 py-1.5 hover:text-gray-50 ${isActive(
                        item.path
                      )}`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-[#242424] bg-[#121212] p-2">
        <ArrowLeftEndOnRectangleIcon
          onClick={() => {
            signOut();
          }}
          className="cursor-pointer relative flex justify-center rounded px-2 py-1.5 text-gray-200 hover:bg-indigo-200 hover:text-gray-700"
        />
      </div>
    </div>
  );
}
