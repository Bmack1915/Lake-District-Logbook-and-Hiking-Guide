export default function decodeBase64(base64String) {
  const binaryString = window.atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Convert the binary data to a Blob and create a URL
  const blob = new Blob([bytes], { type: "application/gpx+xml" });
  const url = URL.createObjectURL(blob);

  return url;
}
