import ReactModal from 'react-modal';

function Modal({ modalOpen, closeModal, children }) {
  return (
    <ReactModal
      isOpen={modalOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      onRequestClose={closeModal}
      style={{
        overlay: {
          backGroundColor: 'white',
          zIndex: 10000,
        },
        content: {
          backgroundColor: 'white',
          margin: 10,
        },
      }}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
