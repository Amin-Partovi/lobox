import { EmojiStyle } from "emoji-picker-react";
import { SkinTones } from "emoji-picker-react";
import { ChangeEvent, KeyboardEvent, RefObject } from "react";
export interface MultiSelectDropdownProps {
  options: string[];
  placeholder?: string;
  initialValue: string[];
  onChange: (value: string[]) => void;
}

export interface EmojiClickValue {
  activeSkinTone: SkinTones;
  unified: string;
  unifiedWithoutSkinTone: string;
  emoji: string;
  isCustom: boolean;
  names: string[];
  imageUrl: string;
  getImageUrl: (emojiStyle: EmojiStyle) => string;
}

export interface useDropdownToggleOutput {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
  ref: RefObject<HTMLDivElement>;
  handleOpenDropdown: () => void;
  isEmojiPickerOpen: boolean;
  toggleEmojiPicker: () => void;
}

export interface useDropdownFilterOutput {
  term: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  selectedOptions: string[];
  onOptionClick: (option: string) => void;
  onEmojiClick: (value: EmojiClickValue) => void;
  optionsToShow: string[];
}
