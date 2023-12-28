import { RefObject, useEffect, useRef, useState } from "react";

const useDropdown = (): {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  ref: RefObject<HTMLDivElement>;
  handleOpenDropdown: () => void;
} => {
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  function toggleDropdown() {
    setDropdownOpen(!isDropdownOpen);
  }

  function handleOpenDropdown() {
    setDropdownOpen(true);
  }

  function clickEventListenerCallback(
    event: MouseEvent,
    ref: RefObject<HTMLDivElement>
  ) {
    if (event.target && ref.current) {
      if (!ref.current.contains(event.target as Node)) {
        setDropdownOpen(false);
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

  return { toggleDropdown, isDropdownOpen, ref, handleOpenDropdown };
};

export default useDropdown;
