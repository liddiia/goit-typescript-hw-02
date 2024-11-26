import React from "react";
import Modal from "react-modal";
import css from "./ImageModal.module.css";
import { FiXCircle, FiThumbsUp } from "react-icons/fi";
import { Image } from "../../types"; 

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface ImageModalProps {
  onCloseModal: () => void;
  isModalOpen: boolean;
  selectedImage: Image | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ onCloseModal, isModalOpen, selectedImage }) => {
  return (
    <Modal
      className={css.modal}
      isOpen={isModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Expanded image"
    >
      <button
        className={css.buttonClose}
        onClick={onCloseModal}
        style={{ border: "none", background: "none", cursor: "pointer" }}
      >
        <FiXCircle size={30} />
      </button>

      {selectedImage && (
        <div>
          <img
            src={selectedImage.urls.regular}
            alt={selectedImage.alt_description || "Image"}
          />
          <p>
            <FiThumbsUp /> {selectedImage.likes}
          </p>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
