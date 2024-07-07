import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Profile from "@/models/profile";
import * as api from "@utils/api";
import { useContext, useEffect, useState } from "react";
import { FaPhone, FaUser } from "react-icons/fa";
import { IoFileTray, IoKey, IoKeyOutline, IoMail } from "react-icons/io5";
import { ToastMessageContext } from "@/App";
import { FormData, SignupSchema } from "@/models/formType/SignUpType";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/auth/FormField";
import { useCookies } from "react-cookie";
import Jobs from "@/models/jobs";
import DialogBox from "@/components/auth/DialogBox";
import ToastMessage from "@/components/auth/ToastMessage";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const [profil, setProfil] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const { setToastMessage } = useContext(ToastMessageContext);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [jobList, setJobList] = useState<Jobs[]>([]);

  const [Cookie] = useCookies(["token"]);

  const token = Cookie.token;

  useEffect(() => {
    api.getJob().then((data) => {
      setJobList(data);
    });
  }, []);

  useEffect(() => {
    const getProfil = () => {
      const profileStorage = window.localStorage.getItem("profile");
      if (profileStorage) {
        setProfil(JSON.parse(profileStorage));
        setLoading(false);
      }
    };
    getProfil();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    data.avatar = data.avatar[0];
    const { message } = await api.updateProfile(data, token);

    if (message) {
      setLoading(false);

      setToastMessage(message);

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
      console.log(isError, errorMessage);
      setTimeout(() => {
        setIsError(false);
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <DialogBox />

      <Header />
      <main>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div
              className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div
            className="card w-1/2 mx-auto bg-gray-700 shadow-xl py-2 px-8 m-8"
            key={profil[0].id}
          >
            <div>
              <Link to={"/"} className="btn btn-primary">
                Retour à l'accueil
              </Link>
            </div>
            <figure>
              <img
                src={profil[0].avatar}
                alt="Profil"
                className="rounded-xl m-4 w-1/3 h-auto mx-auto"
              />
            </figure>
            <form
              className="form-control gap-5"
              onSubmit={handleSubmit(onSubmit)}
              method="dialog"
            >
              <FormField
                type="text"
                placeholder="name"
                name="name"
                register={register}
                error={errors.name}
                icon={<FaUser />}
              />

              <FormField
                type="text"
                placeholder="Telephone"
                name="tel"
                register={register}
                error={errors.tel}
                icon={<FaPhone />}
              />

              <FormField
                type="select"
                placeholder="Job"
                name="job"
                register={register}
                error={errors.job}
                options={jobList.map((job) => ({
                  name: job.name,
                  value: job.id,
                }))}
              />

              <FormField
                type="select"
                placeholder="Area"
                name="area"
                register={register}
                error={errors.area}
                options={["North", "South", "East", "West"].map((area) => ({
                  name: area,
                  value: area,
                }))}
              />

              <FormField
                type="email"
                placeholder="Email"
                name="email"
                register={register}
                error={errors.email}
                icon={<IoMail />}
              />

              <FormField
                type="password"
                placeholder="Password"
                name="password"
                register={register}
                error={errors.password}
                icon={<IoKey />}
              />

              <FormField
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword}
                icon={<IoKeyOutline />}
              />

              <FormField
                type="file"
                placeholder="FILE"
                name="avatar"
                register={register}
                error={
                  errors.avatar
                    ? { type: "error", message: "Invalid file" }
                    : undefined
                }
                icon={<IoFileTray />}
              />

              <button type="submit" className="btn btn-primary w-1/2 self-end">
                Update profile
              </button>
            </form>
          </div>
        )}
      </main>
      <ToastMessage />
      <Footer />
    </div>
  );
}
