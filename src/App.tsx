import { useAccount, useConnect, useDisconnect, useReadContract } from "wagmi";
import abi from "./public/abi/SoftlinkSupplyChainContract.json";
import { Address, StringToBytesOpts, parseEther } from "viem";
import {
  readContract,
  simulateContract,
  watchContractEvent,
  writeContract,
} from "wagmi/actions";
import { config } from "./wagmi";

import { toASCII } from "punycode";
function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  // const {
  //   data: hash,
  //   isPending,
  //   return simulateContract ,
  //   error:werror,
  //   isError
  // } = usereturn simulateContract(config,)

  const { data: heartBeat } = useReadContract({
    abi,
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName: "heartBeat",
    args: [],
  });
  

 
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
  

 


  async function approveBySupplier(batchId: number) {
    return writeContract(config, {
      abi,
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "approveBySupplier",
      args: [BigInt(batchId)],
      chainId: 1337,
    });
  }

  async function approveByReceiver(batchId: number) {
    return writeContract(config, {
      abi,
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "approveByReceiver",
      args: [BigInt(batchId)],
      chainId: 1337,
    });
  }


function getTendersOfSupplier(supplier:Address){
  return readContract(config,{
    abi,
    address:"0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName:"getTendersOfSupplier",
    args:[supplier]        
  })
}


function getTendersOfCustomer(){
  return  readContract(config,{
     abi,
     address:"0x5FbDB2315678afecb367f032d93F642f64180aa3",
     functionName:"getTendersOfCutomer",
     args:[]        
   })
 }

function getTendersOfReceiver(receiver:Address){
 return  readContract(config,{
    abi,
    address:"0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName:"getTendersOfReceiver",
    args:[
      receiver
    ]        
  })
}

  // const unwatch = watchContractEvent(config,{
  //   address: '0x6b175474e89094c44da98b954eedeac495271d0f',
  //   abi,
  //   eventName: 'UpdatedMilestone',
  //   onLogs(logs) {
  //     console.log('New logs!', logs)
  //     //Update Status of Milestone
  //   },
  // })

  // useEffect(()=>unwatch)

  return (
    <>
      <div>
        <h2>Account</h2>
        {heartBeat?.toString()}
        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
        <button onClick={async ev=> {

console.log(
  await createPkg(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  "NY",
  "AMS",
  "0.1",
   "12-04-2024",
   "softship",
  300,
  300,
  300,
  300,
  300,
  300,
  0,
  true,
  false
  )
);

          
        }}>upload Pkg</button>


<button onClick={async ev => {
    const tenders = await getTendersOfSupplier("0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC");
    console.log(tenders);
    
}} >Get Supplier Tenders</button>

<button onClick={async ev => {
    const tenders = await getTendersOfCustomer("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
    console.log(tenders);
    
}}>Get Customer Tenders</button>

<button onClick={async ev => {
    const tenders = await getTendersOfReceiver("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
    console.log(tenders);
    
}}>Get Receiver Tenders</button>

<button onClick={async ev => {
    const tenders = await approveBySupplier(0);
    console.log(tenders);
    
}}>Supplier Approval</button>

<button onClick={async ev => {
    const tenders = await approveByReceiver(0);
    console.log(tenders);
    
}}> Receiver Approval</button>
      </div>
    </>
  );
}

export default App;
