import { UserNav } from "../../sidebar/user-nav";
import { Layout, LayoutBody, LayoutHeader } from "../../ui/layout";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import sample from "./data/sample";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
export default function Status() {
  const role = useSelector((state: any) => state.auth.role);
  const token = useSelector((state: any) => state.auth.token);
  const [data,setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response: any = await axios.get(
          `http://localhost:7000/api/v1/cargo/data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resp = response.data.data;
        const res = resp.map((item, index) => ({
          label: item.label,
          status: item.status,
          shipped: item.shipped.slice(0, 10),
          delivery: item.deivery,
          recipient: item.pickup,
          supplier: item.supplier,
        }));
        setData(res);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Layout className="md:pl-10">
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className="flex flex-col md:w-11/12 p-4" fixedHeight>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Track Your Packages!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of packages you sent!
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 py-5">
          <div className="col-span-2 -mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <DataTable data={data} columns={columns} />
          </div>
        </div>
      </LayoutBody>
    </Layout>
  );
}
