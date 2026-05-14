import { useState } from "react";
import { createPortal } from "react-dom";
import LeadPopup from "./LeadPopup";

function LeadRequestButton({ label = "Submit Request", className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setOpen(true)}
      >
        {label}
      </button>

      {open &&
        createPortal(
          <LeadPopup onClose={() => setOpen(false)} />,
          document.body
        )}
    </>
  );
}

export default LeadRequestButton;