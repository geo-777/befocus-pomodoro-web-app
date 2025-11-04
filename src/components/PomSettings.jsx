import { X } from "lucide-react";
import { useState } from "react";
const PomSettings = ({ isVisible, visibilityHandler, settings, setter }) => {
  // initialize from props
  const [focusMin, setFocusMin] = useState(() =>
    settings.focus.split(":")[0].trim()
  );
  const [sbreakMin, setSbreakMin] = useState(() =>
    settings.break.split(":")[0].trim()
  );
  const [lbreakMin, setLbreakMin] = useState(() =>
    settings.longBreak.split(":")[0].trim()
  );

  return (
    <div className={`settings-window ${isVisible ? "" : "hidden"}`}>
      <div className="settings-header">
        <div>
          {" "}
          <h3>Timer Settings</h3>
          <p>Customize your timer duration in minutes.</p>
        </div>

        <X
          className="x-btn"
          strokeWidth={2}
          size={16}
          onClick={() => visibilityHandler(false)}
        />
      </div>
      <div className="settings-focus settings-form-item">
        <p>Focus Duration</p>
        <div>
          <input
            type="number"
            min={1}
            value={focusMin}
            onChange={(e) => {
              setFocusMin(e.target.value);
            }}
            onBlur={() => {
              if (focusMin === "" || Number(focusMin) < 1) {
                setFocusMin(1);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "e" || e.key === "+" || e.key === "-")
                e.preventDefault();
            }}
          />{" "}
          <p>minutes</p>
        </div>
      </div>
      <div className="settings-break settings-form-item">
        <p>Break Duration</p>
        <div>
          <input
            type="number"
            min={1}
            value={sbreakMin}
            onChange={(e) => {
              setSbreakMin(e.target.value);
            }}
            onBlur={() => {
              if (sbreakMin === "" || Number(sbreakMin) < 1) {
                setSbreakMin(1);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "e" || e.key === "+" || e.key === "-")
                e.preventDefault();
            }}
          />{" "}
          <p>minutes</p>
        </div>
      </div>
      <div className="settings-long-break settings-form-item">
        <p>Long Break Duration</p>
        <div>
          <input
            type="number"
            min={1}
            value={lbreakMin}
            onChange={(e) => {
              setLbreakMin(e.target.value);
            }}
            onBlur={() => {
              if (lbreakMin === "" || Number(lbreakMin) < 1) {
                setLbreakMin(1);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "e" || e.key === "+" || e.key === "-")
                e.preventDefault();
            }}
          />{" "}
          <p>minutes</p>
        </div>
      </div>
      <div className="settings-submit-btn-container">
        <button
          className="settings-submit-btn-item"
          onClick={() => visibilityHandler(false)}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setter({
              focus: `${String(focusMin).padStart(2, "0")}:00`,
              break: `${String(sbreakMin).padStart(2, "0")}:00`,
              longBreak: `${String(lbreakMin).padStart(2, "0")}:00`,
            });

            visibilityHandler(false);
          }}
          className="settings-submit-btn-item save"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PomSettings;
