const ModalDelete = ({ isDelete, onClose, children }) => {
	return (
		<div
			onClick={onClose}
			className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${isDelete ? "visible bg-black/20" : "invisible"}
      `}
		>
			{/* modal */}
			<div
				onClick={(e) => e.stopPropagation()}
				className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${isDelete ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
			>
				<button
					onClick={onClose}
					className="absolute p-0.5 font-bold text-white bg-red-700 rounded-lg top-2 right-2 hover:bg-gray-50 hover:text-gray-600"
				>
					X
				</button>
				<div className="w-fit">{children}</div>
			</div>
		</div>
	);
};

export default ModalDelete;
