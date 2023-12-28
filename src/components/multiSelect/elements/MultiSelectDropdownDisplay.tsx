import React from "react";

import styles from "./multi-select-dropdown-display.module.scss";

const NUM_TO_SHOW = 3;

const MultiSelectDropdownDisplay = ({
  isHidden,
  onClick,
  selectedOptions,
  placeholder,
}: {
  isHidden: boolean;
  onClick: () => void;
  selectedOptions: string[];
  placeholder?: string;
}) => {
  const numberOfSelectedOptions = selectedOptions.length;

  // displaying at most NUM_TO_SHOW of selected options
  const listOfOptions = () => {
    return selectedOptions.slice(0, NUM_TO_SHOW).map((item, index, arr) => (
      <span key={item}>
        {item}
        {index !== arr.length - 1 ? "," : ""} &nbsp;
      </span>
    ));
  };

  // e.g. 3 others
  const extraOptions = () => {
    return (
      <span>
        {numberOfSelectedOptions - NUM_TO_SHOW > 0
          ? `, ${numberOfSelectedOptions - NUM_TO_SHOW} others`
          : ""}
      </span>
    );
  };

  return (
    <div
      className={`${styles["selected-options"]} ${
        isHidden ? styles.hidden : ""
      }`}
      onClick={onClick}
    >
      {numberOfSelectedOptions ? (
        <>
          {listOfOptions()}

          {extraOptions()}
        </>
      ) : (
        <span>{placeholder}</span>
      )}
    </div>
  );
};

export default MultiSelectDropdownDisplay;
