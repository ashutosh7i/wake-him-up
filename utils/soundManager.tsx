let audio: HTMLAudioElement | null = null;

export const playSound = () => {
  if (!audio) {
    audio = new Audio('/path/to/your/wake-up-sound.mp3'); // Replace with your actual sound file path
    audio.loop = true;
  }
  audio.play();
};

export const stopSound = () => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};