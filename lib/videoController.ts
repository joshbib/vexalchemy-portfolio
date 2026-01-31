let currentVideo: HTMLVideoElement | null = null;

export function playExclusive(video: HTMLVideoElement) {
  if (currentVideo && currentVideo !== video) {
    currentVideo.pause();
  }
  currentVideo = video;
}
