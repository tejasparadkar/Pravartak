import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi";
import abi from "../../../public/abi/SoftlinkSupplyChainContract.json";
import { Address, StringToBytesOpts, parseEther } from "viem";
import {
  readContract,
  simulateContract,
  watchContractEvent,
  writeContract,
} from "wagmi/actions";
import { config } from "../../../wagmi";

export default function CustomerQuot() {
  const id = useSelector((state: any) => state.auth.id);
  const token = useSelector((state: any) => state.auth.token);
  const [res, setRes] = useState([]);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response: any = await axios.get(
        `http://localhost:7000/api/v1/cargo/all?owner=5d7a514b5d2c12c7449be042&isApprovedByOwner=false`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resp = response.data.data;
      setRes(resp);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  async function createPkg(
    _receiver: Address,
    supplier: Address,
    _pickup: string,
    _delivery: string,
    _tenderBudget: string,
    _expectedDate: string,
    _label: string,
    _weight: number,
    _height: number,
    _vol: number,
    _len: number,
    _wid: number,
    _qty: number,
    _p_type: number,
    _stacking: boolean,
    _cold_storage: boolean
  ) {
    const res = await writeContract(config, {
      abi,
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "registerTender",
      args: [
        _receiver,
        supplier,
        _pickup,
        _delivery,
        parseEther(_tenderBudget),
        _expectedDate,
      ],
      value: parseEther(_tenderBudget),
      chainId: 1337,
    });

    console.log(res);

    // setTimeout(() => {
   return addPkgDetails(
      _label,
      _weight,
      _height,
      _vol,
      _len,
      _wid,
      _qty,
      _p_type,
      _stacking,
      _cold_storage
    );
    // }, 3000);
  }

  async function addPkgDetails(
    _label: string,
    _weight: number,
    _height: number,
    _vol: number,
    _len: number,
    _wid: number,
    _qty: number,
    _p_type: number,
    _stacking: boolean,
    _cold_storage: boolean
  ) {
    return writeContract(config, {
      abi,
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "addTenderDetails",
      args: [
        _label,
        _weight,
        _height,
        _vol,
        _len,
        _wid,
        _qty,
        _p_type,
        _stacking,
        _cold_storage,
      ],
      chainId: 1337,
    });
  }

  const handleApprove = async (item:any) => {
    const res = createPkg(
      item.receiverWallet,
      item.supplier,
      item.pickup,
      item.delivery,
      item.depositBudget,
      item.expectedDate,
      item.label,
      item.weight,
      item.height,
      item.vol,
      item.len,
      item.wid,
      item.qty,
      item.p_type,
      item.stacking,
      item.cold_storage
    )



  };

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
                    <Button onClick={() => handleApprove(item)}>
                      Approve
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleReject(item._id)}
                    >
                      Reject
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
