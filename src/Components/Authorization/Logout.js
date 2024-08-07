import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(logout());
    alert("User logged out!");
    navigate("/");
  }

  return <Button onPress={handleLogOut}>Logout</Button>;
}
