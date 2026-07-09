const Watermark = () => {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
      <img
        src="/logo.webp"
        alt="Watermark"
        className="w-[80%] max-w-[800px] object-contain -rotate-12 transform scale-150"
      />
    </div>
  );
};

export default Watermark;
