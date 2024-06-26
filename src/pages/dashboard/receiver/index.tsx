import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { UserNav } from "../sidebar/user-nav";
import abi from "../../../public/abi/SoftlinkSupplyChainContract.json";
import { config } from "../../../wagmi";

import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";

import { Overview } from "./components/overview";
import { useSelector } from "react-redux";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "../ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { readContract, writeContract } from 'wagmi/actions'
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const data = [
  { name: "Jan", total: 0 },
  { name: "Feb", total: 0 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 0 },
  { name: "May", total: 0 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 0 },
  { name: "Aug", total: 0 },
  { name: "Sep", total: 0 },
  { name: "Oct", total: 0 },
  { name: "Nov", total: 0 },
  { name: "Dec", total: 0 },
];

export default function ReceiverDashboard() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const navigate = useNavigate();
  const [received, setReceived] = useState(false);
  const [data, setData] = useState([]);

  const handleReceived = () => {
    setReceived(!received);
    approveByReceiver(account.address);
  };

  const handleConnect = () => {
    connect({ connector: connectors[0] });
    window.location.reload();
  };



  function getTendersOfReceiver(receiver: string) {
    return readContract(config, {
      abi,
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "getTendersOfReceiver",
      args: [receiver],
    });
  }

  useEffect(() => {
    console.log(account.address);
    getTendersOfReceiver("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC").then(it => {
      console.log(it);
      setData(it.filter(i => i.stage == 1));
    });
  }, [])


  async function approveByReceiver(batchId: number) {
    const res = await writeContract(config, {
      abi,
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "approveByReceiver",
      args: [BigInt(batchId)],
      chainId: 1337,
    });
    toast({
      title: "Success",
      description: "Redirecting",
      className: "font-Geist bg-green-500 text-white rounded-xl",
    });
    setTimeout(() => {
      navigate("/dashboard/receiver");
    }, 1000);

    getTendersOfReceiver("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC").then(it => {
      console.log(it);
      setData(it);
    });
    return res;
  }
  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </LayoutHeader>

        {/* ===== Main ===== */}
        <LayoutBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-semibold">
                  Connect Wallet
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 p-2 items-center">
                  {account.address === null ? (
                    <>
                      <div className="w-5 h-5 bg-red-600 rounded-2xl"></div>
                      <p
                        className="text-[14px] text-gray-800 cursor-pointer"
                        onClick={handleConnect}
                      >
                        Not Connected
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-5 h-5 bg-green-600 rounded-2xl"></div>
                      <p
                        className="text-[14px] text-gray-800 cursor-pointer"
                        onClick={handleConnect}
                      >
                        Connected
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 ">
            <Card className="col-span-1 lg:col-span-4">
              <CardHeader>
                <CardTitle>Pending Request</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.map((e) =>
                  <div className="w-full h-10 flex justify-between">
                    <p>{e.label}</p>
                    {received ? (
                      <Button onClick={handleReceived}>
                        <CheckIcon />
                      </Button>
                    ) : (
                      <Button onClick={ev => approveByReceiver(e.batchId)}>Mark As Received</Button>
                    )}
                  </div>

                )}
              </CardContent>
            </Card>
          </div>
        </LayoutBody>
      </Layout>
    </>
  );
}
