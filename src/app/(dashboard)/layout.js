import Sidebar from "@/components/sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
