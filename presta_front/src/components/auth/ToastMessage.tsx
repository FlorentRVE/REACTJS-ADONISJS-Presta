import { useContext, useEffect } from "react";
import { ToastMessageContext } from "@/App";

export default function ToastMessage() {
  const { toastMessage, setToastMessage } = useContext(ToastMessageContext);

  useEffect(() => {
    setTimeout(() => {
      setToastMessage("");
    }, 2000);
  }, [toastMessage, setToastMessage]);
  return (
    <>
      {toastMessage && (
        <div className="toast">
          <div className="alert alert-info">
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
}