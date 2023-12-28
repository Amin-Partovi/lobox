import { RefObject, useEffect, useRef, useState } from "react";

const useDropdown = (): {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  ref: RefObject<HTMLDivElement>;
  handleOpenDropdown: () => void;
  isEmojiPickerOpen: boolean;
  toggleEmojiPicker: () => void;
} => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  function toggleDropdown() {
    setDropdownOpen(!isDropdownOpen);
  }

  function toggleEmojiPicker() {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  }

  function handleOpenDropdown() {
    setDropdownOpen(true);
    setIsEmojiPickerOpen(false);
  }

  function clickEventListenerCallback(
    event: MouseEvent,
    ref: RefObject<HTMLDivElement>
  ) {
    if (event.target && ref.current) {
      if (!ref.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setIsEmojiPickerOpen(false);
      }
    }
  }

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

export default useDropdown;
