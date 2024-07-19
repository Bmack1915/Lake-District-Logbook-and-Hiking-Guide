import React from "react";
import AuthCheck from "../Authorization/AuthCheck";

export default function Logbook() {
  return (
    <AuthCheck>
      <h1>Welcome to your logbook!</h1>
    </AuthCheck>
  );
}
