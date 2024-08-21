import { useDispatch } from "react-redux";
import { Logout } from "../../redux/userSlice";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(Logout());
    navigate("/");
  }

  return (
    <Button
      color="primary"
      variant="bordered"
      className="text-xl"
      onPress={handleLogOut}
    >
      Logout
    </Button>
  );
}
