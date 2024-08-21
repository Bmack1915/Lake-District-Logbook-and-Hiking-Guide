import { useNavigate } from "react-router-dom";

export default function HandleNavigate() {
  const navigate = useNavigate();
  navigate("/");
}
