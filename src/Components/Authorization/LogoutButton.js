import { useDispatch } from "react-redux";
import { Logout } from "../../redux/userSlice";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(Logout());
    toast.success("Successfully logged out");
    navigate("/");
  }

  return (
    <Button color="primary" variant="bordered" onPress={handleLogOut}>
      Logout
    </Button>
  );
}
