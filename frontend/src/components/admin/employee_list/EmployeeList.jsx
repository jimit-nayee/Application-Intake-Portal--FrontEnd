import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { deleteEmployee, getAllEmployees } from '../../../services/EmployeeService';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DeleteIcon from '@mui/icons-material/Delete';
import "./style.css"
import api from '../../../services/mainService';
const EmployeeList = () => {

  const [tableData, setTableData] = useState([])
  let [tableUpdated, setTableUpdated] = useState(false);
  
  const columns = [
    { title: "Username", field: "email", filterPlaceholder: "filter" },
    { title: "Role", field: "role", lookup: { ROLE_AGENT: "Agent", ROLE_REVIEWER: "Reviewer", ROLE_ADMIN: "Admin" }, filterPlaceholder: "filter" },
    { title: "Mobile Number", field: "mono", filterPlaceholder: "filter" },
    { title: "Status", field: "is_approved", filterPlaceholder: "filter", lookup: { 0: "Pending", 1: "Approved" } },
  ]

  useEffect(() => {
    getAllEmployees()
      .then((res) => { console.log(res); setTableData(res.data); })
      .catch((err) => {
        setTableData(false);
        console.log("Error occured")
      })
  }, [tableUpdated]);

  return (
    <>
      <MaterialTable columns={columns} data={tableData} title="Customers Information"
        editable={{
          // onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
          //   // console.log(selectedRow)
          //   deleteEmployee(selectedRow).then(() => {
          //     resolve();
          //     // By hook or crook i wanted to react know that table is updated
          //     tableUpdated ? setTableUpdated(false) : setTableUpdated(true);
          //   });
          // })
        }}

        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          sorting: true, search: true,
          searchFieldAlignment: "right", searchAutoFocus: true, searchFieldVariant: "standard",
          filtering: true, paging: true, pageSizeOptions: [2, 5, 10, 20, 25, 50, 100], pageSize: 5,
          paginationType: "stepped", showFirstLastPageButtons: true, paginationPosition: "both", exportButton: true,
          exportAllData: true, exportFileName: "TableData", addRowPosition: "first", actionsColumnIndex: -1,
          // selectionProps: rowData => ({
          //   disabled: rowData.age === null,
          // color:"primary"
          // }),
          grouping: true, columnsButton: true,
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#32cd32", color: "#fff" }
        }}
        actions={[
          
          (rowData) => {
            return (
              rowData.is_approved == 0
                ? {
                  icon: HowToRegIcon, 
                  onClick: () => {
                    // alert("approve user")
                    // console.log(rowData.email) 
                    api.post("http://localhost:8080/isApprove", rowData, { withCredentials: true })
                    .then(()=>{
                      tableUpdated ? setTableUpdated(false) : setTableUpdated(true);
                    }) 
                  }
                }
                : { icon: DeleteIcon, 
                  onClick: () => { 
                    // alert("delete  user")
                    deleteEmployee(rowData)
                    .then(() => {
                      // resolve();
                      // By hook or crook i wanted to react know that table is updated
                      tableUpdated ? setTableUpdated(false) : setTableUpdated(true);
                    });
                   } 
                 }
               )
              },
          (rowData) => {
            return rowData.is_approved == 0 ? {
              icon: DeleteIcon, tooltip: 'delete',
              onClick: (event, rowData) => {
                //alert("delete  user")
                deleteEmployee(rowData)
                .then(() => {
                  // resolve();
                  // By hook or crook i wanted to react know that table is updated
                  tableUpdated ? setTableUpdated(false) : setTableUpdated(true);
                });
              }
            } : ""
          },
        ]}
      />
    </>
  );
}

export default EmployeeList