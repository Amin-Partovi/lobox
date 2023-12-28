import styles from "./app.module.scss";
import React from "react";
import MultiSelect from "./components/multiSelect/MultiSelect";

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
        <MultiSelect
          options={options}
          placeholder="select something"
          initialValue={["Sport ⚽", "Health 🩺"]}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default App;
