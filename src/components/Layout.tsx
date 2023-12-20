import Sidebar from "./Sidebar";
import PrelineScript from "./PrelineScript";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen overflow-hidden bg-[#010101] flex">
      <PrelineScript />
      <Sidebar />
      <div className="overflow-y-scroll w-full">{children}</div>
    </div>
  );
}
