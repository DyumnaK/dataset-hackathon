export default function AACButton({ item, onClick, onUpdate }) {
  const handleDrop = e => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("aac-token");
    if (!raw) return;

    const resource = JSON.parse(raw);

    if (resource.type === "image") {
      onUpdate({
        ...item,
        icon: resource.url
      });
    }

    if (resource.type === "audio") {
      onUpdate({
        ...item,
        audio: resource.url
      });
    }
  };

  return (
    <div
      className="aac-tile"
      onClick={onClick}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="aac-icon">
        {item.icon ? (
          <img src={item.icon} alt="" />
        ) : (
          "ICON"
        )}
      </div>

      <input
        className="aac-label-input"
        value={item.label}
        onChange={e =>
          onUpdate({ ...item, label: e.target.value })
        }
      />
    </div>
  );
}
