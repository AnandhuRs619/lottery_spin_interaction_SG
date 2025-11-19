export default function SpinButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative select-none
        transition-all 
        ${disabled ? "opacity-60 cursor-not-allowed" : "hover:brightness-110 active:scale-[0.97]"}
      `}
      style={{ width: "260px", height: "85px" }}
    >
      {/* Image */}
      <img
        src="/src/assets/image/Spin_Button.png"
        alt="Spin Button"
        className="w-full h-full object-contain pointer-events-none"
      />
    </button>
  );
}
