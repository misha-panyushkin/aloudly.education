const CONSTRAINTS = { audio: true };
const USER_MEDIA = navigator.mediaDevices && navigator.mediaDevices.getUserMedia && navigator.mediaDevices.getUserMedia(CONSTRAINTS) || new Promise(() => {});

export default USER_MEDIA;