import { useState } from "react";
import LeadPopup from "./LeadPopup";

function LeadRequestButton({ label = "Buy / Sell Request", className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className={className} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open && <LeadPopup onClose={() => setOpen(false)} />}
    </>
  );
}

export default LeadRequestButton;