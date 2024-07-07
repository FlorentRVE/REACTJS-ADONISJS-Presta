
function SigninButton() {
  return (
    <div>
      <button
        className=""
        onClick={() =>
          (
            document.getElementById("auth_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        Login
      </button>
    </div>
  );
}

export default SigninButton