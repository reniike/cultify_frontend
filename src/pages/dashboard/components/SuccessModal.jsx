import React from "react";
import Modal from "react-modal";

const SuccessModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Registration Success"
    >
      <h2>Registration Successful!</h2>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default SuccessModal;
