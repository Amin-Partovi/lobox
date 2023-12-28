import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { EmojiClickValue, useDropdownFilterOutput } from "../types";

const useDropdownFilter = ({
  options,
  initialValue,
}: {
  options: string[];
  initialValue: string[];
}): useDropdownFilterOutput => {
  const startTransition = useTransition()[1];
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [_options, setOptions] = useState<string[]>([]);
  const [optionsToShow, setOptionsToShow] = useState<string[]>([]);
  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    setOptions(options);
    setOptionsToShow(options);
  }, [options]);

  useEffect(() => {
    setSelectedOptions(initialValue);
  }, [initialValue]);

  // handle input state and filter options based on the input value
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTerm(value);
    startTransition(() => {
      setOptionsToShow(
        _options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
    });
  };

  // add new option by pressing enter and selecting the new option
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

  // select option by clicking on the option
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

  // add emoji to the input value
  const handleClickEmoji = useCallback(
    (value: EmojiClickValue) => {
      setTerm((term) => term + value.emoji);
    },
    [term]
  );

  return {
    term,
    onInputChange: handleChangeInput,
    onKeyDown: handleKeyDown,
    selectedOptions,
    onOptionClick: handleOptionClick,
    onEmojiClick: handleClickEmoji,
    optionsToShow,
  };
};

export default useDropdownFilter;
