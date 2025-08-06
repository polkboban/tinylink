

export default function Footer() {
  return (
    <footer className="bg-[#001837] text-white text-center py-10 mt-[10px] text-sm relative z-10">
      <p className="mb-2 font-semibold">
        Sign up for free. Your free plan includes:
      </p>
      <p>
        <img src="/tick.svg" alt="Checkmark" className="inline-block mr-1" /> 5 short links/month &nbsp;&nbsp;
        <img src="/tick.svg" alt="Checkmark" className="inline-block mr-1" /> 3 custom back-halves/month &nbsp;&nbsp;
        <img src="/tick.svg" alt="Checkmark" className="inline-block mr-1" /> Unlimited link clicks
      </p>
    </footer>
  );
}
