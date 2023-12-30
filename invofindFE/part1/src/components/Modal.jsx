// Modal.js
const Modal = ({ isOpen, onClose, onConfirm, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#31343f] p-4 rounded-lg text-center">
        <h2 className="text-white text-lg font-bold mb-4">{title}</h2>
        <div className="text-white mb-4">{content}</div>
        <button
          onClick={onConfirm}
          className="bg-[#a0d2eb] text-[#373b4c] px-4 py-2 rounded mr-2"
        >
          Confirm
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
