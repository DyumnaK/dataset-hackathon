import { useState } from "react";
import Teacher from "./Teacher";
import Student from "./Student";

function App() {
  const [view, setView] = useState("teacher");

  return (
    <div style={{ padding: 20 }}>
      <button onClick={() => setView("teacher")}>Teacher</button>
      <button onClick={() => setView("student")}>Student</button>
      {view === "teacher" ? <Teacher /> : <Student />}
    </div>
  );
}
export default App;
