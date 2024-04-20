import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { UserNav } from "../sidebar/user-nav";

import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";

import { Overview } from "./components/overview";
import { useSelector } from "react-redux";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "../ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

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

  const [received, setReceived] = useState(false);

  const handleReceived = () => {
    setReceived(!received);
  };

  const handleConnect = () => {
    connect({ connector: connectors[0] });
    window.location.reload();
  };

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
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="w-full h-10 flex justify-between">
                  <p>Label</p>
                  {received ? (
                    <Button onClick={handleReceived}>
                      <CheckIcon />
                    </Button>
                  ) : (
                    <Button onClick={handleReceived}>Mark As Received</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </LayoutBody>
      </Layout>
    </>
  );
}
