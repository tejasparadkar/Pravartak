import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Supplier() {
  const [showDetails, setShowDetails] = useState(false);
  const id = useSelector((state: any) => state.auth.id);
  const token = useSelector((state: any) => state.auth.token);
  const [res, setRes] = useState([]);
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: any = await axios.get(
          `http://localhost:7000/api/v1/cargo/all?supplier=${id}&status=pending`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const resp = response.data.data;
        setRes(resp);
        console.log(res);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClickDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleSubmit = async () => {
    console.log(res[0]._id);
    try {
      const response: any = await axios.put(
        `http://localhost:7000/api/v1/cargo/${res[0]._id}`,
        {
          isApprovedBySupplier: true,
          depositBudget: budget,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };
  return (
    <>
      <div className="">
        <div className="px-10 pt-16 pb-4">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="supplier">Supplier</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="grid grid-cols-4 h-screen">
          <div className="mx-5 px-5 py-5 rounded-xl border col-span-2 space-y-5">
            <div className="flex space-x-4">
              <h1>Manage Request</h1>
              <Badge className="rounded-full">7</Badge>
            </div>
            <div className="space-y-4">
              <div className="w-full border flex justify-between px-10 py-5 rounded-xl">
                <div>
                  <p className="text-xl font-medium">{res[0]?.label}</p>
                  <p
                    className="text-sm text-gray-400 cursor-pointer"
                    onClick={handleClickDetails}
                  >
                    View Details
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showDetails && (
            <div className="col-span-2">
              <div className="p-5 border rounded-md">
                <div className="flex justify-between">
                  <p>Details</p>
                  <div
                    className="w-7 h-7 rounded-full flex hover:bg-gray-200 justify-center items-center cursor-pointer"
                    onClick={handleClickDetails}
                  >
                    <Cross2Icon />
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Label</TableCell>
                      <TableCell>{res[0]?.label}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Length</TableCell>
                      <TableCell>{res[0]?.dimensions.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Height</TableCell>
                      <TableCell>{res[0]?.dimensions.height}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Width</TableCell>
                      <TableCell>{res[0]?.dimensions.width}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Quantity</TableCell>
                      <TableCell>{res[0]?.quantity}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Drop</TableCell>
                      <TableCell>{res[0]?.delivery}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pickup</TableCell>
                      <TableCell>{res[0]?.pickup}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="flex w-full max-w-sm items-center space-x-2 py-5">
                  <Input
                    type="text"
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Budget Proposed"
                  />
                  <Button type="submit" onClick={handleSubmit}>
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
