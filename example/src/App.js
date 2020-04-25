import React from "react";

import useScreenRecording from "use-screen-recording";

export default function App() {
  const { isRecording, recording, toggleRecording } = useScreenRecording();

  return (
    <div className="root">
      <h1>React Hook</h1>
      <h2>useScreenRecording</h2>

      <button onClick={toggleRecording}>
        {isRecording ? "Stop" : "Start Recording"}
      </button>
      {!!recording && (
        <video
          autoPlay
          className="video"
          src={recording && URL.createObjectURL(recording)}
        />
      )}
    </div>
  );
}
