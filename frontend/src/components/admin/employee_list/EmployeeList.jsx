import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { deleteEmployee, getAllEmployees } from '../../../services/EmployeeService';

const EmployeeList = () => {

  const [tableData, setTableData] = useState([])
  let [tableUpdated, setTableUpdated] = useState(false);

  const columns = [
    { title: "Username", field: "username", filterPlaceholder: "filter" },
    { title: "Role", field: "role", lookup: { 0: "Agent", 1: "Reviewer" }, filterPlaceholder: "filter" }, { title: "Mobile Number", field: "mono", filterPlaceholder: "filter" },
  ]

  useEffect(() => {
    getAllEmployees()
    .then((res) => {
      setTableData(res.data);
    }).catch((err) => {
      setTableData(false); alert("Error occured")
    })
  }, [tableUpdated]);

  return (
    <>
      <MaterialTable columns={columns} data={tableData} title="Customers Information"
        editable={{
          onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
            // console.log(selectedRow)
            deleteEmployee(selectedRow).then(() => {
              resolve();
              // By hook or crook i wanted to react know that table is updated
              tableUpdated ? setTableUpdated(false) : setTableUpdated(true);
            });
          })
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
          headerStyle: { background: "#e879f9", color: "#fff" }
        }}
      />
    </>
  );
}

export default EmployeeList