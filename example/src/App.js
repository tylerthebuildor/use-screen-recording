import React from "react";

import useScreenRecording from "use-screen-recording";
import download from "./download";

export default function App() {
  const { recording, toggleRecording } = useScreenRecording({
    onEnd: (event) => setVideo(event.data),
  });
  const [video, setVideo] = React.useState();
  const videoSrc = video && URL.createObjectURL(video);

  return (
    <div className="root">
      <h1>React Hook</h1>
      <h2>useScreenRecording</h2>

      <div className="menu">
        <button onClick={toggleRecording}>
          {recording ? "Stop" : videoSrc ? "Retry" : "Start Recording"}
        </button>
        {!!videoSrc && (
          <>
            <button onClick={() => download(videoSrc)}>Download</button>
            <video autoPlay className="video" src={videoSrc} />
          </>
        )}
      </div>
    </div>
  );
}
