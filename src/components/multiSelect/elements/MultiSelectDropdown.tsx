import React from "react";

import { CheckIcon } from "lucide-react";

import styles from "./multi-select-dropdown.module.scss";

const MultiSelectDropdown = ({
  options,
  onClick,
  selectedOptions,
}: {
  options: string[];
  onClick: (option: string) => void;
  selectedOptions: string[];
}) => {
  return (
    <div
      className={`${styles["dropdown-container"]} `}
      data-testid="multi-select-dropdown"
    >
      <ul className={`${styles["option-list"]} fancy-scrollbar`}>
        {options.map((option) => (
          <li
            key={option}
            className={`${styles["option"]} ${
              selectedOptions.includes(option) ? styles.selected : ""
            }`}
            onClick={() => onClick(option)}
          >
            {option}
            {selectedOptions.includes(option) ? (
              <CheckIcon width={20} height={20} />
            ) : (
              ""
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(MultiSelectDropdown);
