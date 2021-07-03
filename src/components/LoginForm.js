import { withRouter, useHistory } from "react-router-dom";

import { AmplifySignUp, AmplifyAuthenticator } from "@aws-amplify/ui-react";

import { AuthState } from "@aws-amplify/ui-components";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";

Amplify.configure(awsconfig);

const LoginForm = ({ handleAuthStateChange, forceUpdate }) => {
  const history = useHistory();

  const handleStateChange = async (e) => {
    forceUpdate();
    if (e === AuthState.SignedIn) {
      history.push("/");
      forceUpdate();
    }
  };

  return (
    <AmplifyAuthenticator
      className="text-center"
      handleAuthStateChange={handleStateChange}
    >
      <AmplifySignUp
        className="background-customizable inputField-customizable"
        style={{ backgroundColor: "blue" }}
      />
    </AmplifyAuthenticator>
  );
};

export default withRouter(LoginForm);
