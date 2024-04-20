import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import { useSelector } from "react-redux";

export default function DashboardLayout() {
  const token = useSelector((state: any) => state.auth.token);
  if (!token) {
    return <Navigate to="/login" />;
  }

  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className="h-full overflow-hidden bg-background font-Geist">
      <div className="absolute bottom-10 right-10">
        <div className="w-12 h-12 rounded-[40px] bg-black"></div>
      </div>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        <Outlet />
      </main>
    </div>
  );
}
