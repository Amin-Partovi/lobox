import styles from "./app.module.scss";
import React from "react";
import MultiSelectDropdown from "./components/multiSelectDropDown/MultiSelectDropdown";

const options = [
  "Education 📚",
  "Yeeeah Science! 🏫",
  "Art 👩‍🎨",
  "Sport ⚽",
  "Games 🎮",
  "Health 🩺",
  "Movie 🎥",
  "Music 🎵",
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
