import { UserNav } from "../sidebar/user-nav";
import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import sample from "./data/sample";
export default function Status() {
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
        
        <div className="col-span-1 -mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <DataTable data={sample} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  );
}
