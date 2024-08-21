import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function LoginButton() {
  const navigate = useNavigate();

  function handleLoginPress() {
    navigate("/login");
  }

  return (
    <Button color="primary" className="text-xl" onPress={handleLoginPress}>
      Login
    </Button>
  );
}

export default LoginButton;
