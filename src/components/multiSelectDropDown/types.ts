import { EmojiStyle } from "emoji-picker-react";
import { SkinTones } from "emoji-picker-react";
export interface MultiSelectDropdownProps {
  options: string[];
  placeholder?: string;
}

export interface EmojiClickValue {
  activeSkinTone: SkinTones;
  unified: string;
  unifiedWithoutSkinTone: string;
  emoji: string; // the emoji character, for example: '😀'. Emoji ID in custom emojis
  isCustom: boolean; // whether the emoji is a custom emoji or not
  names: string[];
  imageUrl: string; // the url of the emoji image with the current emoji style applied
  getImageUrl: (emojiStyle: EmojiStyle) => string; // a function that receives an emoji style and returns the url of the emoji image with the provided style applied
}
