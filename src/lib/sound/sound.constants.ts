export const SOUND_ASSETS = {
  click: "/sounds/ui/button-click.mp3",
} as const;

export const SOUND_VOLUME = 1;

export type SoundName = keyof typeof SOUND_ASSETS;
