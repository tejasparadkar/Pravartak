import { UserNav } from "../../sidebar/user-nav";
import { Layout, LayoutBody, LayoutHeader } from "../../ui/layout";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import sample from "./data/sample";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import abi from "../../../../public/abi/SoftlinkSupplyChainContract.json";
import { Address, StringToBytesOpts, parseEther } from "viem";
import { readContract, writeContract } from "wagmi/actions";
import { config } from "./../../../../wagmi";
import { useAccount } from "wagmi";
import { Button } from "../../ui/button";

export default function Status() {
  const role = useSelector((state: any) => state.auth.role);
  const token = useSelector((state: any) => state.auth.token);
  const [data, setData] = useState([]);
  const account = useAccount();

  function getTendersOfSupplier(supplier: string) {
    return readContract(config, {
      abi,
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "getTendersOfSupplier",
      args: [supplier],
    });
  }

  useEffect(() => {
    console.log(account.address);
    console.log();


    getTendersOfSupplier(/*account.address*/"0x70997970C51812dc3A010C7d01b50e0d17dc79C8").then(function (it) {
      setData(it.filter(i => i.stage==0));
    }); 

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