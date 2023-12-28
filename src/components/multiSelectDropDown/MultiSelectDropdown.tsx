import { ChevronDown } from "lucide-react";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import MultiSelectDropdownOption from "./MultiSelectDropdownOption";
import styles from "./multi-select-dropdown.module.scss";
import { MultiSelectDropdownProps } from "./types";
import useDropdown from "./useDropdown";
import MultiSelectDropdownDisplay from "./MultiSelectDropdownDisplay";

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  placeholder,
}) => {
  const startTransition = useTransition()[1];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { isDropdownOpen, toggleDropdown, handleOpenDropdown, ref } =
    useDropdown();
  const [_options, setOptions] = useState<string[]>([]);
  const [optionsToShow, setOptionsToShow] = useState<string[]>([]);
  const [term, setTerm] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setTerm(value);
    startTransition(() => {
      setOptionsToShow(
        _options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
    });
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (!optionsToShow.includes(term)) {
        setOptions([term, ..._options]);
        setOptionsToShow([term, ..._options]);
      }
      setSelectedOptions([...selectedOptions, term]);
      setTerm("");
    }
  };

  useEffect(() => {
    setOptions(options);
    setOptionsToShow(options);
  }, [options]);

  useEffect(() => {
    if (isDropdownOpen && inputRef.current) inputRef.current.focus();
  }, [isDropdownOpen]);

  const handleOptionClick = useCallback(
    (option: string) => {
      setTerm("");
      setOptionsToShow(_options);
      if (selectedOptions.includes(option)) {
        setSelectedOptions(
          selectedOptions.filter((selected) => selected !== option)
        );
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    },
    [selectedOptions, _options]
  );

  return (
    <div className={styles["multi-select-dropdown"]} ref={ref}>
      <input
        onClick={handleOpenDropdown}
        className={styles.input}
        value={term}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        ref={inputRef}
      />

      <ChevronDown
        className={styles["chevron"]}
        width={20}
        height={20}
        onClick={toggleDropdown}
      />

      <MultiSelectDropdownDisplay
        onClick={handleOpenDropdown}
        isHidden={isDropdownOpen}
        placeholder={placeholder}
        selectedOptions={selectedOptions}
      />

      {isDropdownOpen ? (
        <ul className={styles["dropdown-container"]}>
          {optionsToShow.map((option) => (
            <MultiSelectDropdownOption
              onClick={handleOptionClick}
              option={option}
              selectedOptions={selectedOptions}
              key={option}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default MultiSelectDropdown;
