import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { BeatLoader, FadeLoader } from 'react-spinners';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useTabContext } from '@mui/lab';
import Pdf from '../../pdf/Pdf';
import api from '../../services/mainService';
import { tr } from 'date-fns/locale';
import { getListOfCutomerForReview, getPdf } from '../../services/CustomerForReviewService';
import './CustomScrollbar.css'; // Import your custom scrollbar styles
import RichTextEditor from '../text-editor/RichTextEditor';
import RichTextEditorModal from '../text-editor/textEditorModal/RichTextEditorModal';
import { Toaster, toast } from 'react-hot-toast';
import PDFModal from '../../pdf/pdfModal/PDFModal';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import CustomCircularProgressBar from '../progressbars/CustomCircularProgressBar';

const ReviewList = () => {

  const [showModal, setShowModal] = React.useState(false);

  const [pdfEmail, setPdfEmail] = useState(false);
  const [tableData, setTableData] = useState([])
  let [tableUpdated, setTableUpdated] = useState(false);
  const [pdfSrc, setPdfSrc] = useState();
  const [componentUpdated, setComponentUpdated] = useState(false)
  const [viewPdfOrTextEditor, setViewPdfOrTextEditor] = useState("pdf");
  const [disapproveText, setDisapproveText] = useState(null)
  const [signature, setSignature] = useState(null);
  const [loading, setLoading] = useState(false)
  const [loadingList, setLoadingList] = useState(null);
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [percentage,setPercentage]=useState(66)

  const columns = [
    { title: "Email", field: "email", sorting: true, filtering: true, headerStyle: { color: "#fff" } },
    { title: "First Namer", field: "fname", filterPlaceholder: "filter" },
    { title: "Last Name", field: "lname" },
    { title: "Address", field: "address" },
    { title: "City", field: "city", filterPlaceholder: "filter" },
    { title: "State", field: "state", headerStyle: { color: "#fff" } },
    { title: "Added By", field: "addedBy", headerStyle: { color: "#fff" } },
  ]

  console.log('review list loaded view ', viewPdfOrTextEditor)

  useEffect(() => {
    setLoadingList(true)
    getListOfCutomerForReview()
      .then((res) => { setLoadingList(false); console.log(res); setTableData(res.data) })
      .catch((err) => { setLoadingList(false); console.log(err); setTableData(false) })
  }, [tableUpdated]);

  function convertBinaryToFile(binaryString, filename, contentType) {
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([byteArray], { type: contentType });
    const formData = new FormData();
    formData.append('file', blob, filename);
    return formData.get('file');
  }




  useEffect(() => {
    if (signature != null) {
      setShowModal(false)
      const file = convertBinaryToFile(pdfSrc.split(",")[1], "file.pdf", "application/pdf");
      api.post("http://localhost:8080/approveCustomer", {
        signedPdf: file,
        email: pdfEmail
      }).then(res => {
        console.log(res.data)
        toast.success("Customer Approoved Successully")
      }).catch((error) => {
        console.log(error)
        toast.error("Error ocuured while approving")
      })
    }
  }, [signature])

  useEffect(() => {




    if (pdfEmail) {
      setPdfSrc(null)
      setLoading(true)

      getPdf(pdfEmail)
        .then((res) => {
          const pdfSrc = `data:application/pdf;base64,${res.data.data}`;
          setPdfSrc(pdfSrc)
          setLoading(false)
          setDownloadProgress(0)
          // document.querySelector('#frame').src = pdfSrc;
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
          alert("Error occured while fetching pdf");
        })
    }
  }, [pdfEmail, componentUpdated])


  if (disapproveText) {
    //disapproveText will be set by RichTextEditorModal which is rendering RichTextEditor
    console.log(disapproveText)
  }



  return (
    <div style={{ postion: "relative", height: "100%", width: "100%" }}>
      <Toaster />
    
      <div >

        {showModal ?

          viewPdfOrTextEditor == "pdf"
            ? <PDFModal setShowModal={setShowModal} pdfSrc={pdfSrc} setPdfSrc={setPdfSrc} setViewPdfOrTextEditor={setViewPdfOrTextEditor} setTableUpdated={setTableUpdated} setSignature={setSignature} tableUpdated={tableUpdated} loading={loading} progress={downloadProgress} />
            :
            (<RichTextEditorModal setData={setDisapproveText} setShowModal={setShowModal} setViewPdfOrTextEditor={setViewPdfOrTextEditor} />
            ) : ""}

      </div>
      {
        loadingList ?
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <BeatLoader />
          </div>
          :
          <MaterialTable columns={columns} data={tableData} title="Customers Information"
            localization={{
              body: {
                emptyDataSourceMessage:
                  "No Records To Display"
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


            }}
            actions={[(row) => {
              return {
                icon: () => <VisibilityOutlinedIcon />,
                tooltip: "View Pdf",
                onClick: () => {
                  // console.log(row);
                  setShowModal(true)
                  setPdfEmail(row.email);
                  componentUpdated ? setComponentUpdated(false) : setComponentUpdated(true)
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
              headerStyle: { background: "#32cd32", color: "#fff" }
            }}

            icons={{ Add: () => <AddIcon /> }} />

      }
    </div>
  );
}

export default ReviewList







