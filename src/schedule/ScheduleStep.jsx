export default function ScheduleStep({ step, onUpdate }) {
  const onDrop = e => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("aac-token");
    if (!raw) return;

    const resource = JSON.parse(raw);
    if (resource.type === "image") {
      onUpdate({ ...step, icon: resource.url });
  }
};


  return (
    <div
      className="schedule-step"
      onDragOver={e => e.preventDefault()}
      onDrop={onDrop}
    >
      <div className="schedule-icon">
        {step.icon ? <img src={step.icon} alt="" /> : "ICON"}
      </div>

      <input
        className="aac-label-input"
        value={step.label}
        onChange={e => onUpdate({ ...step, label: e.target.value })}
      />
    </div>
  );
}
