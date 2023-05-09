import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useTabContext } from '@mui/lab';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import api from '../../../services/mainService';

const AgentCustomerList = () => {

  const [showModal, setShowModal] = React.useState(false);
  const [loading,setLoading]=useState(true);
  const [pdfEmail,setPdfEmail]=useState(false);  
  const [tableData, setTableData] = useState([])
  let [tableUpdated,setTableUpdated]=useState(false);
  const [pdfSrc,setPdfSrc]=useState();

  const columns = [
    { title: "Email", field:"email", sorting: true, filtering: true, headerStyle: { color: "#fff" } },
    { title: "First Namer", field: "fname", filterPlaceholder: "filter" },
    { title: "Last Name", field: "lname" },
    { title: "Address", field: "address"},
    { title: "City", field: "city",filterPlaceholder:"filter" },
    { title: "State", field: "state",
     headerStyle: { color: "#fff" } },
  ]
  


  useEffect(() => {
   let agentEmail= jwtDecode(Cookies.get("token")).sub ;
    //  alert(agentEmail)
      api.get(`http://localhost:8080/getCustomersListForAgent/${agentEmail}`)
      .then(res => setTableData(res.data))
      .catch((err)=>setTableData(false))
  },[tableUpdated]);

  useEffect(()=>{
    if(pdfEmail)
      // alert(pdfEmail)
       api.get(`http://localhost:8080/retrieveFile2?email=${pdfEmail}`).then((res)=>{
        const pdfSrc = `data:application/pdf;base64,${res.data.data}`;
        // document.querySelector('#frame').src = pdfSrc;
        // document.querySelector('#frame2').src = pdfSrc;
        setPdfSrc(pdfSrc)
      setLoading(false)
  }).catch((err)=>{
    setLoading(false);
    alert("Error occured while fetching pdf");
  })
  },[pdfEmail])

  return (
    <div style={{postion:"relative"}}>
      <div style={{}}>
    
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none " id="content">
                {/*header*/}
             
                {/* <iframe id="frame2" style={{width:"600px",height:"600px"}} /> */}
               { !loading ?  <iframe title='pdf' id="frame" src={pdfSrc} style={{width:"600px",height:"400px"}} ></iframe>: <div style={{display:"flex",justifyContent:"center"}}>
                   <FadeLoader />
                </div> }
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    
      </div>
      <MaterialTable columns={columns} data={tableData}  title="Customers Information"
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            // setTableData([...tableData, newRow])
            // axios.post("http://localhost:8080/addCustomer", newRow).then(()=>;
            //resolve();
            // setTimeout(() => resolve(), 500)]
            async function makePostRequest() {
              try {
                  axios.post("http://localhost:8080/addCustomer", newRow);
                // // By hook or crook i wanted to react know that table is updated
                tableUpdated ? setTableUpdated(false) : setTableUpdated(true)
                await resolve(); 
              } catch (error) {
                // handle error
                alert("error occured")
                reject()
              }
            }
            makePostRequest();
          }),
        
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            axios.get(`http://localhost:8080/deleteCustomer?email=${selectedRow.email}`).then(()=>{
            resolve();
            // By hook or crook i wanted to react know that table is updated
              tableUpdated ? setTableUpdated(false) : setTableUpdated(true);      
            });
          })
        }}
        actions={[(row)=>{
          return {
            icon: () => <VisibilityOutlinedIcon />,
            tooltip: "View Pdf",
            onClick:  () => {
              setShowModal(true);
              // console.log(row);
              setPdfEmail(row.email);
            }
              
            // isFreeAction:true
          }
        }
          
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true, search: true,
          searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
          filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
          paginationType: "stepped", showFirstLastPageButtons: true, paginationPosition: "both", exportButton: true,
          exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1, editable: 'never',
          // selectionProps: rowData => ({
          //   disabled: rowData.age === null,
            // color:"primary"
          // }),
          grouping: true, columnsButton: true,
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#e879f9",color:"#fff"}
        }}
       
        icons={{ Add: () => <AddIcon /> }} />
        
       
  </div>
  );
}

export default AgentCustomerList








// const [customers, setCustomers] = useState(false)
// useEffect(() => {
//   axios.get("http://localhost:8080/getCustomersList").then(res => setCustomers(res.data)).catch((err)=>setCustomers(false))
  
//   console.log(customers)
// }, [customers])
// const printTable = () => {
//   return <>
//     <div class="container mx-auto px-4 sm:px-8 ">
//       <div class="py-8">
//         <div>
//           <h2 class="text-2xl font-semibold leading-tight">Customers List</h2>
//         </div>
//         <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto  " >
//           <div
//             class=" inline-block min-w-full shadow-md rounded-lg overflow-hidden" 
//           >
//             <table class="min-w-full leading-normal  ">
//               <thead>
//                 <tr>
//                   <th
//                     class="px-5 py-3 border-b-2 bg-violet-300  text-left text-xs font-semibold text-gray-700 uppercase tracking-wider "
//                   >
//                     Email
//                   </th>
//                   <th
//                     class="px-5 py-3 border-b-2 bg-violet-300  text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
//                   >
//                     First Name
//                   </th>
//                   <th
//                     class="px-5 py-3 border-b-2 bg-violet-300  text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
//                   >
//                     Last Name
//                   </th>
//                   <th
//                     class="px-5 py-3 border-b-2 border-violet-200 bg-violet-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
//                   >
//                     Address
//                   </th>
//                   <th
//                     class="px-5 py-3 border-b-2 border-violet-200 bg-violet-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
//                   >
//                     City
//                   </th>
//                   <th
//                     class="px-5 py-3 border-b-2 border-violet-200 bg-violet-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
//                   >
//                     state
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {
//                   customers.map((customer)=>{
//                     return  <>
//                         <tr>
//                   <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div class="flex">

//                       <div class="ml-3">
//                         <p class="text-gray-900 whitespace-no-wrap">
//                          {customer.email}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div class="flex">

//                       <div class="ml-3">
//                         <p class="text-gray-900 whitespace-no-wrap">
//                         {customer.fname}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <p class="text-gray-900 whitespace-no-wrap">{customer.lname}</p>
//                   </td>
//                   <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div style={{width:"120px"}}>
//                     <p class="text-gray-900 whitespace-no-wrap">{customer.address}</p>
//                     </div>
                  
//                   </td>
//                   <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div style={{width:"120px"}}>
//                     <p class="text-gray-900 whitespace-no-wrap">{customer.city}</p>
//                     </div>
                  
//                   </td>
//                   <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//                     <div style={{width:"120px"}}>
//                     <p class="text-gray-900 whitespace-no-wrap">{customer.state}</p>
//                     </div>
                  
//                   </td>

//                 </tr>
//                       </>
//                   })
//                 }
              

//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   </>
// }

// return (
//   <>
//     {
//      customers ?  printTable() :"No customers are exist" 
//   }

//   </>
// )