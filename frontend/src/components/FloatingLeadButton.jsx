import { useState } from "react";
import { FaHeadset } from "react-icons/fa";
import LeadPopup from "./LeadPopup";

function FloatingLeadButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          className="floating-help-pro"
          onClick={() => setOpen(true)}
          aria-label="Get property assistance"
          title="Get property assistance"
        >
          <FaHeadset />
        </button>
      )}

      {open && <LeadPopup onClose={() => setOpen(false)} />}
    </>
  );
}

export default FloatingLeadButton;