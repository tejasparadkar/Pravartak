import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

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
