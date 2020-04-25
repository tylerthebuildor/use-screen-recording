import * as React from "react";

const defaultDisplayMediaOptions = {
  audio: false,
  video: { cursor: "always" },
};

export default function useScreenRecording({
  displayMediaOptions = defaultDisplayMediaOptions,
  onEnd = () => {},
  onError = () => {},
  onStart = () => {},
} = {}) {
  const [captureStream, setCaptureStream] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [mediaRecorder, setMediaRecorder] = React.useState(null);
  const [recording, setRecording] = React.useState(false);
  const stopRecording = () => {
    try {
      setRecording(false);
      mediaRecorder.stop();
      captureStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      onError(e);
      setError(e);
    }
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      setRecording(true);
      stream.getTracks().forEach((track) => {
        track.onended = stopRecording;
      });
      setCaptureStream(stream);
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = onEnd;
      recorder.start();
      setMediaRecorder(recorder);
      onStart({ stream, recorder });
    } catch (e) {
      setRecording(false);
      onError(e);
      setError(e);
    }
  };
  const toggleRecording = () =>
    recording ? stopRecording() : startRecording();

  return {
    captureStream,
    error,
    mediaRecorder,
    recording,
    startRecording,
    stopRecording,
    toggleRecording,
  };
}
