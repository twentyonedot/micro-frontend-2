import React from "react";
import _ from "lodash";

const Button = () => {
  const message = _.join(["Click", "Me", "from", "Remote"], " ");
  return <button>{message}</button>;
};

export default Button;
