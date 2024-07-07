import { FaWindowClose } from "react-icons/fa";
import SignInForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function DialogBox() {
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="auth_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-primary my-4 text-center">
            Hello User !
          </h3>

          <div>
            <div role="tablist" className="tabs tabs-bordered">
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Sign In"
                />
              <div role="tabpanel" className="tab-content p-10">
                <h1 className="text-2xl text-center font-bold my-2">Login</h1>
                <SignInForm />
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Sign up"
                defaultChecked
              />
              <div role="tabpanel" className="tab-content p-10">
                <h1 className="text-2xl text-center font-bold my-2">Sign up</h1>
                <SignUpForm />
              </div>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn"><FaWindowClose /></button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default DialogBox;
