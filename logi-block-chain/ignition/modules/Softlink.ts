import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LogisticsModule = buildModule("SoftlinkModule", (m) => {

  const logistics = m.contract("SoftlinkSupplyChain", []);
  
  return { logistics };
});

export default LogisticsModule;
