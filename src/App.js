import React from "react";
import ContriesTable from "./components/ContriesTable";

function App(){
  return (
    <>
      <div style={{textAlign: "center", fontFamily: "sans-serif"}}>
        <h1>Task Table</h1>
      </div>
      <ContriesTable />
    </>
  );
}

export default App;
