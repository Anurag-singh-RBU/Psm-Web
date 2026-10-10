import { Howl } from "howler";
import { SOUND_ASSETS, SOUND_VOLUME, type SoundName } from "./sound.constants";

const soundCache = new Map<SoundName, Howl>();

const getSound = (name: SoundName) => {
  const cachedSound = soundCache.get(name);

  if (cachedSound) {
    return cachedSound;
  }

  const sound = new Howl({
    src: [SOUND_ASSETS[name]],
    preload: true,
    volume: SOUND_VOLUME,
  });

  soundCache.set(name, sound);

  return sound;
};

export const preloadSounds = () => {
  (Object.keys(SOUND_ASSETS) as SoundName[]).forEach((name) => {
    getSound(name);
  });
};

export const playSound = (name: SoundName) => {
  try {
    const sound = getSound(name);

    if (sound.state() === "loaded") {
      sound.play();
      return;
    }

    sound.once("load", () => {
      sound.play();
    });
  } catch {
    return;
  }
};
