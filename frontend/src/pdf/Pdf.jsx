
import { useEffect, useRef, useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument, rgb } from "pdf-lib";
import { blobToURL } from "./utils/Utils";
import PagingControl from "./components/PagingControl";
import { AddSigDialog } from "./components/AddSigDialog";
import { BigButton } from "./components/BigButton";
import DraggableSignature from "./components/DraggableSignature";

import dayjs from "dayjs";
import axios from "axios";
import './CustomScrollbar.css'; // Import your custom scrollbar styles

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function downloadURI(uri) {
  var link = document.createElement("a");
  console.log(uri)
  // link.download = name;
  // link.href = uri;
  // document.body.appendChild(link);
  // link.click();
  // document.body.removeChild(link);
}

function Pdf({ pdfSrc, setPdfSrc }) {
  const styles = {
    container: {
      maxWidth: 640,
      height: "100px",
      margin: "0 auto",

    },
    sigBlock: {
      display: "inline-block",
      border: "1px solid #000",
    },
    documentBlock: {
      maxWidth: 800,

      border: "1px solid #999",
      position: "absoulte",
      top: "50%"
    },
    controls: {
      maxWidth: 640,
      padding: 20,
      background: "white",
      display: "flex",
      justifyContent: "space-between",
      paddingRight: 80,
      marginTop: 8,
      zIndex: "1000"
    },
  };
  const [pdf, setPdf] = useState(null);
  // function handler(pdf) {
  //   const pdfSrc = `data:application/pdf;base64,${pdf}`;
  //       // document.querySelector('#frame').src = pdfSrc;
  //       // document.querySelector('#frame2').src = pdfSrc;
  //       setPdf(pdfSrc)

  // }
  const [autoDate, setAutoDate] = useState(true);
  const [originalPdf, setOriginalPdf] = useState(pdfSrc)
  const [signatureURL, setSignatureURL] = useState(null);
  const [position, setPosition] = useState(null);
  const [signatureDialogVisible, setSignatureDialogVisible] = useState(false);
  const [textInputVisible, setTextInputVisible] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDetails, setPageDetails] = useState(null);
  const documentRef = useRef(null);
  const [count, setCount] = useState(0)


  useEffect(async () => {
    const { originalHeight, originalWidth } = pageDetails;

    const scale = originalWidth / documentRef.current.clientWidth;

    const pdfDoc = await PDFDocument.load(pdfSrc); //appending signature here
    const pages = pdfDoc.getPages();
    const firstPage = pages[pageNum];

    // console.log(signatureURL);

    const pngImage = await pdfDoc.embedPng(signatureURL);
    if (pngImage == null)
      pngImage = ""
    const pngDims = pngImage.scale(scale * .3);
    firstPage.drawImage(pngImage, {
      x: 150,
      y: 250,
      width: pngDims.width,
      height: pngDims.height,
    }, [signatureURL, pdfSrc]);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)]);

    const URL = await blobToURL(blob);
    setPdfSrc(URL)

  }, [signatureURL])
  useEffect(() => {
    console.log("position", position)
  }, [position])

  useEffect(() => {

    setSignatureURL(null);
    setPdfSrc(originalPdf)

    console.log(" pdf component mounted");

    return () => {
      console.log(" pdf component unmounted");
      setSignatureURL(null)
      // setPdfSrc(null)
      setPdfSrc(null)
    }

  }, [])


  //componentDidMount()
  //componentDidUpdate()
  //componentWillUnmount()
  console.log("pdf component reloaded")

  // console.log(yScrolled)
  console.log("page details ", pageDetails)



  return (
    <div>
      <div style={styles.container}>

        {signatureDialogVisible ? (
          <AddSigDialog
            autoDate={autoDate}
            setAutoDate={setAutoDate}
            onClose={() => setSignatureDialogVisible(false)}
            onConfirm={async (url) => {
              // alert("confirmed")
              setSignatureURL(url);
              setSignatureDialogVisible(false);



            }}
          />
        ) : null}



        {pdfSrc ? (
          <div>
            <div style={styles.controls}>
              <div>

                {!signatureURL ? (
                  <BigButton
                    marginRight={8}
                    title={"Add signature"}
                    onClick={() => setSignatureDialogVisible(true)}
                  />
                ) : null}

                <BigButton
                  marginRight={8}
                  title={"Reset"}
                  disabled={signatureURL ? false : true}
                  onClick={() => {

                    if (window.confirm("Do you really wanna Reset ?")) {
                      setSignatureDialogVisible(false);
                      setSignatureURL(null);
                      setPdfSrc(originalPdf)
                    }



                  }}
                />

              </div>
              {pdfSrc ? (
                <BigButton
                  marginRight={8}
                  inverted={true}
                  title={"Save"}
                  disabled={signatureURL ? false : true}

                  onClick={() => {
                    if (signatureURL)
                      downloadURI(pdfSrc);
                    else
                      alert("please do signature first");
                  }}
                />
              ) : null}
            </div>
            <div ref={documentRef} style={styles.documentBlock} className="documentRef">


              {pdfSrc ? <Document className="document"
                key={count}
                file={pdfSrc}
                onLoadSuccess={(data) => {
                  setTotalPages(data.numPages);
                }}
                style={{
                  height: "max-content"
                }}
              >
                <Page
                  pageNumber={pageNum + 1}
                  width={800}
                  className="page"
                  onLoadSuccess={(data) => {
                    setPageDetails(data);

                  }}
                  renderTextLayer={false}
                  style={{
                    height: "100px"
                  }}
                />
              </Document>
                : ""}
            </div>
            <PagingControl
              pageNum={pageNum}
              setPageNum={setPageNum}
              totalPages={totalPages}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Pdf;
