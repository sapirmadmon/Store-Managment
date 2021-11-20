import "./loginPage.css";
import { observer } from "mobx-react-lite";
import LoginComponent from "../../components/loginComponent/LoginComponent";

function LoginPage({ store }) {
  return (
    <div id="login">
      <LoginComponent store={store} />
    </div>
  );
}

export default observer(LoginPage);
