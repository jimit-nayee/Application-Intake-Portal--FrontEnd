import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Pdf from '../Pdf';
import { BeatLoader, FadeLoader, ScaleLoader } from 'react-spinners';

const PDFModal = ({setShowModal,pdfSrc,setPdfSrc,setViewPdfOrTextEditor,setSignature,setTableUpdated,tableUpdated,loading  }) => {
  return (
    <div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black  "></div>
            {/* <div className="flex overflow-y-auto fixed inset-0 z-50 outline-none overflow-x-hidden focus:outline-none pdfDiv " onScroll={(e)=>{setYScrolled(e.target.scrollTop)}}> */}
            <div className="flex overflow-y-auto fixed inset-0 z-50 outline-none overflow-x-hidden focus:outline-none pdfDiv " >
              <div className="relative w-auto mx-auto max-w-3xl ">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none ">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mt-1 absolute right-0"
                    type="button"
                    onClick={() => {
                        setShowModal(false)
                    }
                    }
                  >
                    <CloseIcon style={{background:"red",color:"white"}}/>
                  </button>  
                 {

               loading  ?    <div style={{height:"20vh",width:"20vw",display:"flex",backgroundColor:"white",alignItems:"center",justifyContent:'center',flexDirection:"column"}}>
                  Loading pdf ... <br />  <ScaleLoader color="red"  />

                  </div>:
                      <Pdf pdfSrc={pdfSrc} setPdfSrc={setPdfSrc} className="pdf" setViewPdfOrTextEditor={setViewPdfOrTextEditor} setSignature={setSignature} setTableUpdated={setTableUpdated} tableUpdated={tableUpdated} />    
                 }     
                </div>
              </div>
            </div>
    </div>
  )
}

export default PDFModal