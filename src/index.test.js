import useScreenRecording from "./";
import { renderHook } from "@testing-library/react-hooks";

describe("useScreenRecording", () => {
  it("correct init values", () => {
    const { result } = renderHook(() => useScreenRecording());
    const { captureStream, error, mediaRecorder, recording } = result.current;

    expect(captureStream).toBe(null);
    expect(error).toBe(null);
    expect(mediaRecorder).toBe(null);
    expect(recording).toBe(false);
  });
});
