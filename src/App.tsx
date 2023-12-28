import styles from "./app.module.scss";
import React from "react";
import MultiSelectDropdown from "./components/multiSelectDropDown/MultiSelectDropdown";

const options = [
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
  "Option 6",
  "Option 7",
];

function App() {
  return (
    <div className={styles["app"]}>
      <div className={styles["form"]}>
        <MultiSelectDropdown options={options} placeholder="select something" />
      </div>
    </div>
  );
}

export default App;
