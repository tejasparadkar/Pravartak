// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.24;
// import "hardhat/console.sol";
// contract SoftlinkSupplyChainContract {
    

//     event UpdatedMilestone(address batchId);

//     enum Status{
//         NONE,
//         INITIATED,
//         ACCEPTED,
//         REJECTED
//     }

//     address[] private employees;



//     struct PackagingTender {
//       address owner;
//       address receiver;
//       address supplier;
//       address batchId;
//       string pickup;
//       string delivery;
//       string docsIPFS;
//       bool completedPayment;
//       uint depositBudget;
//       uint issuedAt;
//     }

//      PackagingTender[] tenders;
//     //cust and its tendors
//     mapping (address => uint[]) cust_tends;
//     mapping (address => uint[]) supplier_tens;

//     mapping (address => Milestone[]) milestones;

//     // mapping (address => Customs[]) customsHist;

//     mapping (address => Product[]) products;

//     mapping (address => uint) balances;

//     address[]  suppliers;


//     struct Milestone {
//         uint due;
//         Status status;
//     }

//     struct Customs {
//         string loc;
//         string approver;
//         bytes32 proofDocs;
//         Status status;
//     }

//     struct Product {
//         string name;
//         string category;
//         uint price;
//         uint quantity;
//     }
    


//     address private immutable _owner;
//     constructor() {
//         _owner = msg.sender;
//     }


// function registerSupplier(address supplier) public ownerOnly  returns (uint) {
//     suppliers.push(supplier);
//     return suppliers.length;
// }



//     function  addMilestone(address _batchId,uint due) private  returns (uint _mid) {
//         milestones[_batchId].push(Milestone(due,Status.NONE));
//         _mid = milestones[_batchId].length;
        
//     }

//     function heartBeat()  public pure  returns (string memory ) {
//         return "alive";
//     }

//     function depositByCust()public payable   returns (bool) {
//         balances[msg.sender] += msg.value;
//         return true;
//     }

 
//     function registerTender(
//       address _receiver,
//       address _cargo_cust,
//       string memory _pickup,
//       string memory _delivery,
//       string memory _docsIPFS,
//       uint _depositBudget
//     )  external returns (bool _success){

//             // require(balances[_cargo_cust] >= _depositBudget,"Sender doesn;t have enough Desposit ie, Required");

//             tenders.push( PackagingTender({
//                 owner:_cargo_cust,
//                 receiver:_receiver,
//                 supplier:msg.sender,
//                 batchId:block.coinbase,
//                 pickup:_pickup,
//                 delivery:_delivery,
//                 docsIPFS:_docsIPFS,
//                 completedPayment:false,
//                 depositBudget:_depositBudget   ,
//                 issuedAt:block.timestamp
//             }
//             ));
//             balances[_cargo_cust]+=_depositBudget;
//             addMilestone(block.coinbase,_depositBudget/4);
//             addMilestone(block.coinbase,_depositBudget/4);
//             addMilestone(block.coinbase,_depositBudget/4);
//             addMilestone(block.coinbase,_depositBudget/4);
//             supplier_tens[msg.sender].push(tenders.length-1);
//             cust_tends[_cargo_cust].push(tenders.length-1);
//             _success = true;
//     }

//     function getTender(address _batchId)public view returns (PackagingTender memory _tender) {        
//         for (uint i = 0; i < tenders.length; i++) {
//             if (tenders[i].batchId == _batchId) {
//                _tender = tenders[i];
//             }
//         }
//     }

//     function proceedMilestone(address _batchId)public empOnly payable returns (bool _s){
//         Milestone[] storage ms = milestones[_batchId];
//         uint i;
//         for ( i = 0; i < ms.length; i++) {
//            if(ms[i].status!=Status.ACCEPTED)
//             break; 
//         }
//         PackagingTender memory pt = getTender(_batchId);
//         _s = payable(pt.supplier).send(ms[i].due);
//         require(_s,"Payment Failed ");
//         balances[pt.owner]-=ms[i].due;
//         ms[i].status=Status.ACCEPTED;
//         emit UpdatedMilestone(_batchId);
//     }

    

//     function addProduct(address _batchId,
//      string memory _name,
//         string memory _category,
//         uint _price,
//         uint _quantity
//     ) public returns (uint _pid){
//          products[_batchId].push(
//           Product(_name,_category,_price,_quantity)
//         );
//         _pid = products[_batchId].length;
//     }

//     function startsWith(string memory str, string memory prefix) public pure returns (bool) {
//         bytes memory strBytes = bytes(str);
//         bytes memory prefixBytes = bytes(prefix);
        
//         if (strBytes.length < prefixBytes.length) {
//             return false;
//         }
        
//         for (uint i = 0; i < prefixBytes.length; i++) {
//             if (strBytes[i] != prefixBytes[i]) {
//                 return false;
//             }
//         }
        
//         return true;
//     }



//     function registerEmp()public ownerOnly {
//         employees.push(msg.sender);
//     }

//      function getSuppliers()public empOnly view returns (address[] memory){
//         return suppliers;
//     }



// function getTendersOfCutomer() public view returns (PackagingTender[] memory) {
//      uint[] memory x_cust_tends = supplier_tens[msg.sender];
//     PackagingTender[] memory supplier_cs = new PackagingTender[](x_cust_tends.length);
//     for (uint i = 0; i < x_cust_tends.length; i++) {
//         supplier_cs[i] = tenders[x_cust_tends[i]];
//     }
//     return supplier_cs;
// }

// function getTenderDataOfSupplier(address supplier)public  view  returns ( PackagingTender[] memory) {
//     uint[] memory supplier_tnds = supplier_tens[supplier];
//     PackagingTender[] memory supplier_cs = new PackagingTender[](supplier_tnds.length);
//     for (uint i = 0; i < supplier_tnds.length; i++) {
//         supplier_cs[i] = tenders[supplier_tnds[i]];
//     }
//     return supplier_cs;
// }




   

//     modifier ownerOnly {
//         require(msg.sender==_owner,"only owner can register employees");
//         _;        
//     }

//     modifier empOnly {
//         bool isEmp=false;
//         for (uint i = 0; i < employees.length; i++) {
//             if(employees[i]==msg.sender){
//                 isEmp=true;
//                 break;
//             }
//         }
//         require(isEmp,"Only Employees are allowed to update ");
//         _;        
        
//     }

//     receive()external payable {

//     }

// }