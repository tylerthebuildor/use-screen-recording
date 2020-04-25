# use-screen-recording

> Easily create screen recordings using a React Hook.

[![NPM](https://img.shields.io/npm/v/use-screen-recording.svg)](https://www.npmjs.com/package/use-screen-recording) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-screen-recording
```

## Usage

```jsx
import React from "react";
import useScreenRecording from "use-screen-recording";

export default function App() {
  const { isRecording, recording, toggleRecording } = useScreenRecording();

  return (
    <div>
      <button onClick={toggleRecording}>
        {isRecording ? "Stop" : "Start Recording"}
      </button>

      {!!recording && (
        <video autoPlay src={recording && URL.createObjectURL(recording)} />
      )}
    </div>
  );
}
```

## License

MIT © [tylerbuchea](https://github.com/tylerbuchea)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
