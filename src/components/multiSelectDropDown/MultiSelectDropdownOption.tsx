import React from "react";

import { CheckIcon } from "lucide-react";

import styles from "./multi-select-dropdown-option.module.scss";

const MultiSelectDropdownOption = ({
  option,
  onClick,
  selectedOptions,
}: {
  option: string;
  onClick: (option: string) => void;
  selectedOptions: string[];
}) => {
  return (
    <li
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
  );
};

export default React.memo(MultiSelectDropdownOption);
