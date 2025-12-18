import { useState } from "react";

export default function Teacher() {
  const [title, setTitle] = useState("");
  const [rows, setRows] = useState([{ label: "", file: null }]);

  const handleLabelChange = (i, value) => {
    const copy = [...rows];
    copy[i].label = value;
    setRows(copy);
  };

  const handleFileChange = (i, file) => {
    const copy = [...rows];
    copy[i].file = file;
    setRows(copy);
  };

  const addRow = () => setRows([...rows, { label: "", file: null }]);

  const saveWorksheet = async () => {
    const fd = new FormData();
    fd.append("title", title);
    rows.forEach(r => {
      if (r.label && r.file) {
        fd.append("labels[]", r.label);
        fd.append("images[]", r.file);
      }
    });

    const res = await fetch("http://localhost:5000/api/worksheets", {
      method: "POST",
      body: fd
    });
    const data = await res.json();
    alert("Saved: " + data.title);
  };

  return (
    <div>
      <h2>Create worksheet</h2>
      <input
        placeholder="Worksheet title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div>
        {rows.map((row, i) => (
          <div key={i}>
            <input
              placeholder="Label"
              value={row.label}
              onChange={e => handleLabelChange(i, e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={e => handleFileChange(i, e.target.files[0])}
            />
          </div>
        ))}
      </div>
      <button onClick={addRow}>Add item</button>
      <button onClick={saveWorksheet}>Save</button>
    </div>
  );
}
