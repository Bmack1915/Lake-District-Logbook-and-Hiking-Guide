import axios from "axios";
import { useEffect } from "react";

export default function decodeBinary(binary, { routes }) {
  binary = binary.split(" ");
  binary = binary.map((elem) => parseInt(elem, 2));
  binary = binary.map((elem) => String.fromCharCode(elem));

  let newText = binary.join("").toUpperCase();

  return newText;
}
