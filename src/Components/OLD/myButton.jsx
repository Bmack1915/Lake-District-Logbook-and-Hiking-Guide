import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

function MyButton({ startIcon, handleSubmit, color, variant, children, size }) {
  return (
    <Button
      onClick={handleSubmit}
      size={size}
      color={color}
      variant={variant}
      startIcon={startIcon}
    >
      {children}
    </Button>
  );
}

MyButton.propTypes = {
  startIcon: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
};

export default MyButton;
