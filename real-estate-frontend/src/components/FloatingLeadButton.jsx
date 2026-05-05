import { useState } from "react";
import LeadPopup from "./LeadPopup";

function FloatingLeadButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button className="floating-lead-btn" onClick={() => setOpen(true)}>
          <span>🏠</span>
          <div>
            <strong>Need Property Help?</strong>
            <small>Buy / Sell Request</small>
          </div>
        </button>
      )}

      {open && <LeadPopup onClose={() => setOpen(false)} />}
    </>
  );
}

export default FloatingLeadButton;