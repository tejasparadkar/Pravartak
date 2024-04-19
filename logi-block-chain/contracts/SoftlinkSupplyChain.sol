// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract SoftlinkSupplyChain {


    constructor() {
        
    }




    enum PackageState {
        IN_PROCESS,
    SUPPLIER_DROPPED,
    RECEIVED
    
    }

    enum PckgType {
        FRAGILE,
        NON_FRAGILE
    }

  struct PackagingTender {
      address owner;
      address receiver;
      address supplier;
      uint batchId;
      string pickup;
      string delivery;
    //   string docsIPFS;
      bool completedPayment;
      uint tenderBudget;
      uint issuedAt;
      string expectedDate;
      PackageState stage;
      string label;
      uint weight;
      uint height;
      uint vol;
      uint len;
      uint wid;
      uint qty;
      PckgType p_type;
      bool stacking;
      bool cold_storage;
    }

    PackagingTender[] tenders;

    mapping (address => uint[]) cust_tends;
    mapping (address => uint[]) supplier_tens;
    mapping (address => uint[]) receiver_tens;


    
    function registerTender(
      address _receiver,
      address supplier,
      string memory _pickup,
      string memory _delivery,
      uint _tenderBudget,
      string memory  _expectedDate
      
    )  external payable returns (bool _success){

            require(msg.value >= _tenderBudget,"Sender doesn;t have enough Desposit ie, Required");

          PackagingTender memory pt ;
                pt.owner=msg.sender;
                pt.receiver=_receiver;
                pt.supplier=supplier;
                pt.batchId=tenders.length;
                pt.pickup=_pickup;
                pt.delivery=_delivery;
                pt.completedPayment=false;
                pt.tenderBudget=_tenderBudget;
                pt.issuedAt=block.timestamp;
                pt.expectedDate=_expectedDate;
                pt.stage=PackageState.IN_PROCESS;

            tenders.push(pt);
            supplier_tens[supplier].push(tenders.length-1);
            cust_tends[msg.sender].push(tenders.length-1);
            receiver_tens[_receiver].push(tenders.length-1);

            _success = true;
    }

    function addTenderDetails(
       string memory _label,
      uint _weight,
      uint _height,
      uint _vol,
      uint _len,
      uint _wid,
      uint _qty,
      uint _p_type,
      bool _stacking,
      bool _cold_storage
    ) external returns (bool _updated){
      //  uint[] memory cur_tndr_s = cust_tends[msg.sender];  
      //  console.log("%v",cur_tndr_s.length);
      //  uint cur_tndr_i = cur_tndr_s[cur_tndr_s.length];
      PackagingTender storage pt = tenders[tenders.length-1];

       pt.label = _label;
       pt.weight = _weight;
       pt.height = _height;
       pt.vol = _vol;
       pt.len = _len;
       pt.wid = _wid;
       pt.qty = _qty;
       pt.p_type =  _p_type == 0 ? PckgType.NON_FRAGILE : PckgType.FRAGILE;
       pt.stacking = _stacking;
       pt.cold_storage = _cold_storage;    
       _updated = true;
       }


   function getTendersOfSupplier(address supplier)public  view  returns ( PackagingTender[] memory) {
    uint[] memory supplier_tnds = supplier_tens[supplier];
    PackagingTender[] memory supplier_cs = new PackagingTender[](supplier_tnds.length);
    for (uint i = 0; i < supplier_tnds.length; i++) {
        supplier_cs[i] = tenders[supplier_tnds[i]];
    }
    return supplier_cs;
}


function getTendersOfCutomer() public view returns (PackagingTender[] memory) {
     uint[] memory x_cust_tends = cust_tends[msg.sender];
    PackagingTender[] memory supplier_cs = new PackagingTender[](x_cust_tends.length);
    for (uint i = 0; i < x_cust_tends.length; i++) {
        supplier_cs[i] = tenders[x_cust_tends[i]];
    }
    return supplier_cs;
}


   function getTendersOfReceiver(address receiver)public  view  returns ( PackagingTender[] memory) {
    uint[] memory receiver_tnds = receiver_tens[receiver];
    PackagingTender[] memory supplier_cs = new PackagingTender[](receiver_tnds.length);
    for (uint i = 0; i < receiver_tnds.length; i++) {
        supplier_cs[i] = tenders[receiver_tnds[i]];
    }
    return supplier_cs;
}

  function approveBySupplier(uint batchId)public   returns (bool) {
    // require(tenders[batchId].supplier == msg.sender,"Only Supplier can approve");
    tenders[batchId].stage = PackageState.SUPPLIER_DROPPED;
  }

  function approveByReceiver(uint batchId)public payable returns (bool _s) {
    // require(tenders[batchId].stage == PackageState.SUPPLIER_DROPPED,"Package Must be dropped");
    // require(tenders[batchId].receiver == msg.sender,"Only Receiver can approve");
    
      _s = payable(tenders[batchId].supplier).send(tenders[batchId].tenderBudget);
        require(_s,"Payment Failed ");
    tenders[batchId].stage = PackageState.RECEIVED;
    tenders[batchId].completedPayment = true;

  }




    receive()external payable {

    }








}