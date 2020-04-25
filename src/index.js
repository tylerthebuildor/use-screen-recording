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
  const [isRecording, setIsRecording] = React.useState(false);
  const [recording, setRecording] = React.useState(null);
  const stopRecording = () => {
    try {
      setIsRecording(false);
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
      setIsRecording(true);
      stream.getTracks().forEach((track) => {
        track.onended = stopRecording;
      });
      setCaptureStream(stream);
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        onEnd(event);
        setRecording(event.data);
      };
      recorder.start();
      setMediaRecorder(recorder);
      onStart({ stream, recorder });
    } catch (e) {
      setIsRecording(false);
      onError(e);
      setError(e);
    }
  };
  const toggleRecording = () =>
    isRecording ? stopRecording() : startRecording();

  return {
    captureStream,
    error,
    isRecording,
    mediaRecorder,
    recording,
    startRecording,
    stopRecording,
    toggleRecording,
  };
}
