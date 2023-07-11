import React from "react";
import Modal from "react-modal";
import "../styles/modal.css";
import ok from "../../../assets/images/ok.png";
import error from "../../../assets/images/error.jpg";

const SuccessModal = ({ isOpen, onRequestClose, text, failed }) => {
  return (
    <Modal className="modal" isOpen={isOpen} onRequestClose={onRequestClose}>
      <img src={failed ? error : ok} alt="" />
      <h1>Registration Successful!</h1>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SuccessModal;
