import { ToastMessageContext } from "@/App";
import { logout } from "@/utils/api";
import { useContext } from "react";
import { useCookies } from "react-cookie";

export default function LogOut() {
  const [Cookie, setCookie] = useCookies(["token"]);
  const { setToastMessage } = useContext(ToastMessageContext);

  const token = Cookie.token;

  const logOut = async (token: string) => {
    if (token) {
      const { message } = await logout(token);

      if (message) {
        setToastMessage(message);
        setCookie("token", "");
        localStorage.clear();
        window.location.replace("/");
        const authModal = document.getElementById(
          "auth_modal"
        ) as HTMLDialogElement;
        authModal.close();
      }
    }
  };

  return (
    <p onClick={() => logOut(token)}>
      LogOut
    </p>
  );
}
