import "./Popup.css";

export default function AddAlgorithmPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>+Add algorithm form</h2>

        <div className="form-grid">
          <div>
            <label>Name</label>
            <input placeholder="text" />
          </div>

          <div>
            <label>last updated</label>
            <input placeholder="Date" />
          </div>

          <div>
            <label>Purpose</label>
            <input placeholder="text" />
          </div>

          <div>
            <label>owner</label>
            <input placeholder="Value" />
          </div>

          <div>
            <label>Version</label>
            <input placeholder="Value" />
          </div>

          <div>
            <label>runs (this month)</label>
            <input placeholder="Value" />
          </div>

          <div>
            <label>status</label>
            <select>
              <option>Value</option>
            </select>
          </div>
        </div>

        <div className="popup-actions">
          <button className="submit-btn">Submit</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
