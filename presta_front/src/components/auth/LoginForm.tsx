import { FaKey } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useCookies } from "react-cookie";
import * as api from "@utils/api";
import { useContext, useState } from "react";
import { ToastMessageContext } from "@/App";
import { GoAlertFill } from "react-icons/go";

function SignInForm() {
  const [, setCookie] = useCookies(["token"]);
  const [isError, setIsError] = useState(false);
  const { setToastMessage } = useContext(ToastMessageContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    const { token, message } = await api.login(email, password);

    if (token) {
      setToastMessage(message);

      setCookie("token", token);

      api.getProfile(token).then((data) => {
        const profile = JSON.stringify(data);
        localStorage.setItem("profile", profile);
      });

      setTimeout(() => {
        window.location.replace("/profile");
      }, 2000);

      const authModal = document.getElementById(
        "auth_modal"
      ) as HTMLDialogElement;
      authModal.close();
    } else {
      setIsError(true);
      setErrorMessage(message);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <form
        className="form-control gap-5"
        onSubmit={handleSubmit}
        method="dialog"
      >
        <label className="input input-bordered flex items-center gap-2">
          <IoMail />
          <input
            type="email"
            name="email"
            className="grow"
            placeholder="Email"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <FaKey />
          <input
            type="password"
            name="password"
            className="grow"
            placeholder="Password"
          />
        </label>

        {isError && (
          <div role="alert" className="alert alert-error">
            <GoAlertFill />
            <span>{errorMessage}</span>
          </div>
        )}
        <button type="submit" className="btn btn-primary w-1/2 self-end">
          Login
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
