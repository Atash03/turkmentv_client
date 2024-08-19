const Buble = () => {
  return (
    <div className="-z-0 relative pointer-events-none">
      <div className="buble absolute top-10 left-28 w-96 h-96 bg-[#bfa6e7] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-buble transition-colors dark:bg-[#3448FF]"></div>
      <div className="buble absolute bottom-20 right-28 w-96 h-96 bg-[#bfa6e7] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-buble transition-colors dark:bg-[#3448FF]"></div>
    </div>
  );
};

export default Buble;
