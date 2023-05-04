import React, { useEffect } from 'react'
import Pdf from '../../pdf/Pdf'

const Modal = ({pdfSrc,setShowModal,setPdfSrc}) => {
useEffect(()=>{
    console.log("model mounted")
   
    return ()=>{
    console.log("model unmounted")
        
        setPdfSrc(null)
    }
})
  return (
    <>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <div className="flex overflow-y-auto fixed inset-0 z-50 outline-none overflow-x-hidden focus:outline-none">
      <div className="relative w-auto mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mt-1 absolute right-0"
            type="button"
            onClick={() => setShowModal(false)}
          >
            X
          </button>
          {pdfSrc ? <Pdf pdfSrc={pdfSrc} /> : <div>Loading PDF...</div>}
        </div>
      </div>
    </div>
  </>
  )
}

export default Modal