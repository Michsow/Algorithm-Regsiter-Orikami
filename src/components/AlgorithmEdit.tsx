import "./Popup.css";

export default function EditAlgorithmPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Edit</h2>

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

          {/* Only in EDIT */}
          <div>
            <label>Change owner</label>
            <input placeholder="ID" />
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
