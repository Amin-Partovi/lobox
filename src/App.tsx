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
  const handleChange = (value: string[]) => {
    console.log(value);
  };
  return (
    <div className={styles["app"]}>
      <div className={styles["form"]}>
        <MultiSelectDropdown
          options={options}
          placeholder="select something"
          initialValue={["Sport ⚽", "Games 🎮", "Health 🩺"]}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default App;
