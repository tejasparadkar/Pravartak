import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { UserNav } from "../sidebar/user-nav";

import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";

import { useSelector } from "react-redux";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const SupplierDashboard = () => {
  const id = useSelector((state: any) => state.auth.id);
  const token = useSelector((state: any) => state.auth.token);
  const [sample, setSample] = useState([]);
  const data = [
    { name: "January", total: 0 },
    { name: "February", total: 0 },
    { name: "March", total: 0 },
    { name: "April", total: 0 },
    { name: "May", total: 0 },
    { name: "June", total: 0 },
    { name: "July", total: 0 },
    { name: "August", total: 0 },
    { name: "September", total: 0 },
    { name: "October", total: 0 },
    { name: "November", total: 0 },
    { name: "December", total: 0 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.get(
          `http://localhost:7000/api/v1/cargo/customer/${id}/analysis`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const res = response.data.data.statsData.bar;
        console.log(res);
        const mergedData = data.map((item) => {
          const foundMonth = res.find(
            (monthData) => monthData.month === item.name
          );
          if (foundMonth) {
            return { ...item, total: foundMonth.turnover };
          }
          return item;
        });

        setSample(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, token]);

  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
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
                  {!account.address ? (
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
                      {/* <p className="text-[10px]">{account? account.address : "Connect"}</p> */}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Jobs
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
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applications
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card className="col-span-1 lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={sample}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Bar
                      dataKey="total"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </LayoutBody>
      </Layout>
    </>
  );
};

export default SupplierDashboard;
