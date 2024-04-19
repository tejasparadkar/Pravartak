import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

export default function CustomerQuot() {
  const id = useSelector((state: any) => state.auth.id);
  const token = useSelector((state: any) => state.auth.token);
  const [res, setRes] = useState([]);

  const fetchData = async () => {
    try {
      const response: any = await axios.get(
        `http://localhost:7000/api/v1/cargo/all?owner=${id}&isApprovedByOwner=false`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resp = response.data.data;
      console.log(resp);
      setRes(resp);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };

  const handleUpdate = async (selectedSupplier) => {
    try {
      const response: any = await axios.put(
        `http://localhost:7000/api/v1/cargo/${res[0]._id}`,
        {
          isApprovedBySupplier: false,
          supplier: selectedSupplier._id,
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

  const [supplierData, setSupplierData] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/v1/auth/supplier"
        );
        setSupplierData(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };
    fetchData();

    fetchSupplier();
  }, []);
  const handleApprove = () => {};

  return (
    <>
      <div className="">
        <div className="px-10 pt-16 pb-4"></div>
        <div className="grid grid-cols-4">
          <div className="mx-5 px-5 py-5 rounded-xl border col-span-2 space-y-5">
            <div className="flex space-x-4">
              <h1>Manage Request</h1>
            </div>
            <div className="space-y-4">
              {res &&
                Array.isArray(res) &&
                res.length > 0 &&
                res.map((item) => (
                  <div
                    key={item._id}
                    className="w-full border flex justify-between px-10 py-5 rounded-xl"
                  >
                    <p>{item.label}</p>
                    <p>{item.supplier.name}</p>
                    <p>${item.depositBudget}</p>
                    <Button onClick={() => handleApprove(item._id)}>
                      Approve
                    </Button>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Reject</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] font-Geist">
                        <DialogHeader>
                          <DialogTitle>Reselect Supplier</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Select onValueChange={setSelectedSupplier}>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                              </SelectTrigger>
                              <SelectContent className="font-Geist">
                                {supplierData &&
                                  supplierData?.map((supplier) => (
                                    <SelectItem
                                      key={supplier._id}
                                      value={supplier.name}
                                    >
                                      {supplier.name}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex justify-center">
                            <Button
                              className="w-1/2"
                              onClick={() => {
                                handleUpdate(selectedSupplier);
                                console.log(selectedSupplier);
                              }}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
