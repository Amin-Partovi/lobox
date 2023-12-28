import { RefObject, useEffect, useRef, useState } from "react";
import { useDropdownToggleOutput } from "../types";

const useDropdownToggle = (): useDropdownToggleOutput => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleOpenDropdown = () => {
    setDropdownOpen(true);
    setIsEmojiPickerOpen(false);
  };

  // clicking outside of the multi select dropdown close both dropdown and emoji picker
  const clickEventListenerCallback = (
    event: MouseEvent,
    ref: RefObject<HTMLDivElement>
  ) => {
    if (event.target && ref.current) {
      if (!ref.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setIsEmojiPickerOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", (event: MouseEvent) => {
      clickEventListenerCallback(event, ref);
    });

    return () => {
      document.removeEventListener("click", (event: MouseEvent) => {
        clickEventListenerCallback(event, ref);
      });
    };
  }, []);

  // close dropdown when the emoji picker is open
  useEffect(() => {
    if (isEmojiPickerOpen) setDropdownOpen(false);
  }, [isEmojiPickerOpen]);

  return {
    toggleDropdown,
    isDropdownOpen,
    ref,
    handleOpenDropdown,
    toggleEmojiPicker,
    isEmojiPickerOpen,
  };
};

export default useDropdownToggle;
