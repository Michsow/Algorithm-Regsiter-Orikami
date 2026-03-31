import "./AlgorithmPage.css";

export default function Algorithms() {
  return (
    <div className="algorithms-page">
      {/* Header */}
      <div className="alg-header">
        <h1>Algorithms</h1>
        <button className="add-btn">+ Add algorithm</button>
      </div>

      {/* Search */}
      <div className="search-bar">search button</div>

      {/* Stats cards */}
      <div className="stats">
        <div className="card">algorithm total amount</div>
        <div className="card">algorithm active amount</div>
        <div className="card">public accessible algorithms</div>
        <div className="card">algorithms categories</div>
      </div>

      {/* Table section */}
      <div className="table-section">
        <h3>algorithm list</h3>

        {/* Table header */}
        <div className="table-header">
          <span>ID</span>
          <span>name</span>
          <span>purpose</span>
          <span>version</span>
          <span>status</span>
          <span>last updated</span>
          <span>owner</span>
          <span>runs (this month)</span>
          <span></span>
        </div>

        {/* Rows */}
        <div className="table-row">
          <div className="row-content"></div>
          <button className="edit-btn">edit</button>
        </div>

        <div className="table-row">
          <div className="row-content"></div>
          <button className="edit-btn">edit</button>
        </div>
      </div>
    </div>
  );
}
