import CustomerDashboard from "./cust";
import SupplierDashboard from "./emp";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const role = useSelector((state: any) => state.auth.role);

  if (role == "supplier") {
    return <SupplierDashboard />;
  } else if (role == "customer") {
    {
      return <CustomerDashboard />;
    }
  }
}
