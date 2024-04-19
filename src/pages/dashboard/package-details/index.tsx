import { useEffect, useState } from "react";

import Receiver from "./receiver";
import Details from "./details";
import axios from "axios";
import { useSelector } from "react-redux";

interface Details {
  label: string;
  weight: string;
  volume: string;
  height: string;
  length: string;
  width: string;
  quantity: number;
  cargoType: string;
  allowStacking: string;
  coldStorage: string;
}

interface ReceiverDetails {
  pickUp: string;
  drop: string;
  supplier: string;
  wallet: string;
}

export default function Index() {
  const [currentStep, setCurrentStep] = useState<any>(1);
  const [submit, setSubmit] = useState<boolean>(false);
  const token = useSelector((state: any) => state.auth.token);
  const id = useSelector((state: any) => state.auth.id);

  const [details, setDetails] = useState<Details>({
    label: "",
    weight: "",
    volume: "",
    height: "",
    length: "",
    width: "",
    quantity: 0,
    cargoType: "",
    allowStacking: "",
    coldStorage: "",
  });

  const [receiverDetails, setReceiverDetails] = useState<ReceiverDetails>({
    pickUp: "",
    drop: "",
    supplier: "",
    wallet: "",
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  async function uploadPackage() {
    //ignore the errors
    const formData = {
      owner: id,
      label: details.label,
      weight: details.weight,
      quantity: details.quantity,
      cargoType: details.cargoType,
      allow_stacking: details.allowStacking,
      coldStorage: details.coldStorage,
      pickup: receiverDetails.pickUp,
      delivery: receiverDetails.drop,
      receiverWallet: receiverDetails.wallet,
      dimensions: {
        length: details.length,
        width: details.width,
        height: details.height,
      },
    };
    try {
      const response: any = await axios.post(
        "http://localhost:7000/api/v1/cargo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (submit) {
      uploadPackage();
    }
  }, [submit]);

  let formComponent;
  switch (currentStep) {
    case 1:
      formComponent = (
        <Details
          formData={details}
          updateFormData={(data: any) => setDetails(data)}
          nextStep={nextStep}
        />
      );
      break;
    case 2:
      formComponent = (
        <Receiver
          formData={receiverDetails}
          updateFormData={(data: any) => setReceiverDetails(data)}
          prevStep={prevStep}
          submit={() => {
            setSubmit(true);
          }}
        />
      );
      break;
    default:
      formComponent = null;
  }

  return (
    <>
      <div>{formComponent}</div>
    </>
  );
}
