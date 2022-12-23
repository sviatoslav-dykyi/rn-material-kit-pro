import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../navigation/context-utils";

const SignOut = () => {
  const { signOut } = useContext(AuthContext);
  useEffect(() => {
    signOut();
  }, []);

  return <></>;
};

export default SignOut;
