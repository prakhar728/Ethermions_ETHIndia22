import React from "react";
import { ImCross } from "react-icons/im";
import Loader from "./Loader";

const Modal = ({
  closeModal,
  heading,
  children,
  onSubmit,
  loading,
  isBtn = true,
}) => {
  return (
    <div className="modalContainer">
      <div className="modalABody">
        <div className="modalHead">
          <h2>{heading}</h2>
          <ImCross onClick={closeModal} style={{ cursor: "pointer" }} />
        </div>
        {children}
        {isBtn ? (
          <button className="btn" onClick={loading ? null : onSubmit}>
            {loading ? <Loader height="20" width="20" /> : "Submit"}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
