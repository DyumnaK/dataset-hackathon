import { useEffect, useState } from "react";

const SCROLL_ZONE = 80;
const SCROLL_SPEED = 15;

export default function Student() {
  const [worksheet, setWorksheet] = useState(null);
  const [correctMap, setCorrectMap] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/worksheets/latest")
      .then(r => r.json())
      .then(ws => {
        if (!ws) return;
        const map = {};
        ws.items.forEach(it => {
          map["label-" + it.id] = "img-" + it.id;
        });
        setWorksheet(ws);
        setCorrectMap(map);
      });
  }, []);

  const allowDrop = ev => {
    ev.preventDefault();
    const y = ev.clientY;
    const h = window.innerHeight;
    if (y < SCROLL_ZONE) window.scrollBy(0, -SCROLL_SPEED);
    else if (y > h - SCROLL_ZONE) window.scrollBy(0, SCROLL_SPEED);
  };

  const drag = ev => {
    ev.dataTransfer.setData("text/plain", ev.target.id);
  };

  const drop = ev => {
    ev.preventDefault();
    const imgId = ev.dataTransfer.getData("text/plain");
    const label = ev.currentTarget;

    const labelText = label.getAttribute("data-label");
    label.innerHTML = labelText + " ";
    const img = document.getElementById(imgId);
    if (img) label.appendChild(img);

    if (correctMap[label.id] === imgId) {
      label.classList.add("correct");
      label.classList.remove("wrong");
    } else {
      label.classList.add("wrong");
      label.classList.remove("correct");
    }
  };

  const checkScore = () => {
    let score = 0;
    const total = Object.keys(correctMap).length;
    Object.entries(correctMap).forEach(([labelId, imgId]) => {
      const label = document.getElementById(labelId);
      if (!label) return;
      const img = label.querySelector("img");
      if (img && img.id === imgId) score++;
    });
    alert(`Score: ${score} / ${total}`);
  };

  if (!worksheet) return <div>No worksheet yet</div>;

  return (
    <div>
      <h2>{worksheet.title}</h2>
      <button onClick={checkScore}>Check score</button>

      <div style={{ display: "flex", gap: 40, marginTop: 16 }}>
        <div style={{ width: "50%" }}>
          {worksheet.items.map(it => (
            <div key={it.id} style={{ margin: 8 }}>
              <img
                src={it.imageUrl}
                id={`img-${it.id}`}
                alt={it.label}
                width={80}
                height={80}
                draggable="true"
                onDragStart={drag}
                style={{ border: "1px solid #ccc" }}
              />
            </div>
          ))}
        </div>
        <div style={{ width: "50%" }}>
          {worksheet.items.map(it => (
            <div
              key={it.id}
              id={`label-${it.id}`}
              data-label={it.label}
              onDragOver={allowDrop}
              onDrop={drop}
              style={{
                border: "2px dashed #aaa",
                padding: 8,
                margin: 8,
                minHeight: 40
              }}
            >
              {it.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
