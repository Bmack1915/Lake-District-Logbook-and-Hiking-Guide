import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(logout());
    toast.success("Successfully logged out");
    navigate("/home");
  }

  return (
    <Button color="primary" variant="bordered" onPress={handleLogOut}>
      Logout
    </Button>
  );
}
