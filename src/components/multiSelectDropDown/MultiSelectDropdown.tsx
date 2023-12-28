import { ChevronDown, LaughIcon } from "lucide-react";
import React, { Suspense, useEffect, useRef } from "react";

import MultiSelectDropdownDisplay from "./elements/MultiSelectDropdownDisplay";
import MultiSelectDropdownOption from "./elements/MultiSelectDropdownOption";
import { MultiSelectDropdownProps } from "./types";
import useDropdownFilter from "./hooks/useDropdownFilter";
import useDropdownToggle from "./hooks/useDropdownToggle";

import styles from "./multi-select-dropdown.module.scss";

const EmojiPicker = React.lazy(() => import("emoji-picker-react"));

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  placeholder,
  initialValue,
  onChange,
}) => {
  // this custom hook handle open and close state of the dropdown options and emoji picker
  const {
    isDropdownOpen,
    toggleDropdown,
    handleOpenDropdown,
    ref,
    isEmojiPickerOpen,
    toggleEmojiPicker,
  } = useDropdownToggle();

  // this custom hook handle the value of the input, filter options, and select option
  const {
    term,
    onInputChange,
    onKeyDown,
    selectedOptions,
    onOptionClick,
    onEmojiClick,
    optionsToShow,
  } = useDropdownFilter({ options, initialValue });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isDropdownOpen && inputRef.current) inputRef.current.focus();
  }, [isDropdownOpen]);

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      <div className={styles["multi-select-dropdown"]} ref={ref}>
        <input
          onClick={handleOpenDropdown}
          className={styles.input}
          value={term}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          ref={inputRef}
        />

        <LaughIcon
          onClick={toggleEmojiPicker}
          className={styles.laugh}
          width={20}
          height={20}
        />

        <ChevronDown
          className={styles.chevron}
          width={20}
          height={20}
          onClick={toggleDropdown}
        />

        <MultiSelectDropdownDisplay
          onClick={handleOpenDropdown}
          isHidden={isDropdownOpen || isEmojiPickerOpen}
          placeholder={placeholder}
          selectedOptions={selectedOptions}
        />

        {isDropdownOpen ? (
          <ul className={styles["dropdown-container"]}>
            {optionsToShow.map((option) => (
              <MultiSelectDropdownOption
                onClick={onOptionClick}
                option={option}
                selectedOptions={selectedOptions}
                key={option}
              />
            ))}
          </ul>
        ) : null}

        <Suspense>
          {isEmojiPickerOpen ? (
            <EmojiPicker
              onEmojiClick={onEmojiClick}
              className={styles["emoji-picker"]}
            />
          ) : null}
        </Suspense>
      </div>
    </>
  );
};

export default MultiSelectDropdown;
