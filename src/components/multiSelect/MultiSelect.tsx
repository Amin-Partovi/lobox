import { ChevronDown, LaughIcon } from "lucide-react";
import React, { Suspense, useEffect, useRef } from "react";

import MultiSelectDisplay from "./elements/MultiSelectDisplay";
import useDropdownFilter from "./hooks/useDropdownFilter";
import useDropdownToggle from "./hooks/useDropdownToggle";
import { MultiSelectProps } from "./types";

import styles from "./multi-select.module.scss";

const EmojiPicker = React.lazy(() => import("emoji-picker-react"));
const MultiSelectDropdown = React.lazy(
  () => import("./elements/MultiSelectDropdown")
);

const MultiSelect: React.FC<MultiSelectProps> = ({
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
      <div className={styles["multi-select"]} ref={ref}>
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
          data-testid="laugh-icon"
        />

        <ChevronDown
          className={`${styles.chevron} ${isDropdownOpen ? styles.rotate : ""}`}
          width={20}
          height={20}
          onClick={toggleDropdown}
          data-testid="chevron-down-icon"
        />

        <MultiSelectDisplay
          onClick={handleOpenDropdown}
          isHidden={isDropdownOpen || isEmojiPickerOpen}
          placeholder={placeholder}
          selectedOptions={selectedOptions}
        />
        <Suspense>
          {isDropdownOpen ? (
            <MultiSelectDropdown
              options={optionsToShow}
              onClick={onOptionClick}
              selectedOptions={selectedOptions}
            />
          ) : null}

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

export default MultiSelect;
