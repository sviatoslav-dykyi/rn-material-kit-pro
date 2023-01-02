import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";

const SignOut = () => {
  const { signOut } = useContext(AuthContext);
  useEffect(() => {
    signOut();
  }, []);

  return <></>;
};

export default SignOut;
