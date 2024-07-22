import { CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <CircularProgress color="secondary" />
      <p>🕣 Page is loading...</p>
    </div>
  );
}
