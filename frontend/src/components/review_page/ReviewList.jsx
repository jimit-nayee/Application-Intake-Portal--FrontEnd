import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useTabContext } from '@mui/lab';
import Pdf from '../../pdf/Pdf';
import api from '../../services/mainService';
import { tr } from 'date-fns/locale';
import { getCustomersListForAgent } from '../../services/CustomerForReviewService';

const ReviewList = () => {

  const [showModal, setShowModal] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [pdfEmail, setPdfEmail] = useState(false);
  const [pdfChanged, setPdfChanged] = useState(false);
  const [tableData, setTableData] = useState([])
  let [tableUpdated, setTableUpdated] = useState(false);
  const [pdfSrc, setPdfSrc] = useState();

  const columns = [
    { title: "Email", field: "email", sorting: true, filtering: true, headerStyle: { color: "#fff" } },
    { title: "First Namer", field: "fname", filterPlaceholder: "filter" },
    { title: "Last Name", field: "lname" },
    { title: "Address", field: "address" },
    { title: "City", field: "city", filterPlaceholder: "filter" },
    { title: "State", field: "state", headerStyle: { color: "#fff" } },
    { title: "Added By", field: "addedBy", headerStyle: { color: "#fff" } },
  ]

  useEffect(() => {
    getCustomersListForAgent()
      .then((res) => { console.log(res); setTableData(res.data) })
      .catch((err) => { console.log(err); setTableData(false) })
  }, [tableUpdated]);

  useEffect(() => {
    setLoading(true);
    if (pdfEmail) {
      api.get(`http://localhost:8080/retrieveFile2?email=${pdfEmail}`, { withCredentials: true })
        .then((res) => {
          const pdfSrc = `data:application/pdf;base64,${res.data.data}`;
          setPdfSrc(pdfSrc)
          setLoading(false)
          // document.querySelector('#frame').src = pdfSrc;
        })
        .catch((err) => {
          setLoading(false);
          alert("Error occured while fetching pdf");
        })
    }
  }, [pdfEmail])

  return (
    <div style={{ postion: "relative", }}>
      <div style={{}}>

        {showModal ? (
          <>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            <div className="flex overflow-y-auto fixed inset-0 z-50 outline-none overflow-x-hidden focus:outline-none">
              <div className="relative w-auto mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mt-1 absolute right-0"
                    type="button"
                    onClick={() => {
                      // setPdfSrc(null);
                      setShowModal(false)
                    }
                    }
                  >
                    X
                  </button>
                  {pdfSrc ? <Pdf pdfSrc={pdfSrc} setPdfSrc={setPdfSrc} className="pdf" /> : <div>Loading PDF...</div>}
              
                </div>
              </div>
            </div>
          </>
        ) : null}


      </div>
      <MaterialTable columns={columns} data={tableData} title="Customers Information"
        localization={{
          body: {
            emptyDataSourceMessage:
            <div style={{display:"flex",justifyContent:"center"}}> <FadeLoader color="#36d7b7" /></div>
          }
        }}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            // setTableData([...tableData, newRow])
            // axios.post("http://localhost:8080/addCustomer", newRow).then(()=>;
            //resolve();
            // setTimeout(() => resolve(), 500)]
            async function makePostRequest() {
              try {
                api.post("http://localhost:8080/addCustomer", newRow, { withCredentials: true });
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
            axios.get(`http://localhost:8080/deleteCustomer?email=${selectedRow.email}`).then(() => {
              resolve();
              // By hook or crook i wanted to react know that table is updated
              tableUpdated ? setTableUpdated(false) : setTableUpdated(true);
            });
          })
        }}
        actions={[(row) => {
          return {
            icon: () => <VisibilityOutlinedIcon />,
            tooltip: "View Pdf",
            onClick: () => {
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
          headerStyle: { background: "#e879f9", color: "#fff" }
        }}

        icons={{ Add: () => <AddIcon /> }} />


    </div>
  );
}

export default ReviewList







