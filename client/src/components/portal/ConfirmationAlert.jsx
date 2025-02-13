import React from "react";

const ConfirmationAlert = ({confirm,close}) => {
  return (
    <div id="modelConfirm" className="fixed  z-[999] inset-0 bg-gray-800 bg-opacity-70 overflow-y-auto h-full w-full px-4 ">
      <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">

        <div className="box bg-white border-0">
          <div className="alert custom-alert1 alert-danger" id="dismiss-alert72">
            <button
              type="button"
              className="btn-close ms-auto"
              data-hs-remove-element="#dismiss-alert72"
              aria-label="Close"
            >
              <i className="bi bi-x"></i>
            </button>
            <div className="text-center px-[3rem] pb-0">
              <svg
                className="custom-alert-icon fill-danger inline-flex"
                xmlns="http://www.w3.org/2000/svg"
                height="1.5rem"
                viewBox="0 0 24 24"
                width="1.5rem"
                fill="#000000"
              >

                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z"></path>
              </svg>
              <h5 className="text-[1.7rem] !font-medium">Delete</h5>
              <p className="!text-lg">
                Do you really want to delete this record?
              </p>
              <div className="">

                <button 
                  type="button" onClick={confirm}
                  className="ti-btn !py-1 !px-2 !text-[0.75rem] !font-medium bg-danger text-white m-1"
                >
                  Delete
                </button>
                <button type="button" onClick={()=>close(false)} className="ti-btn ti-btn-light ti-btn-wave !py-1 !px-2 !text-[0.75rem] !font-medium m-1"
                >Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAlert;
