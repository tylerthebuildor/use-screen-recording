export default function download(recordedChunks) {
  const type = "video/mp4";
  const blob = new Blob(recordedChunks, { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "test.mp4";
  a.click();
  window.URL.revokeObjectURL(url);
}
