import SigninButton from "./auth/LoginButton";
import LogOut from "./auth/LogOut";
import { useCookies } from "react-cookie";
import Profile from "@/models/profile";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [Cookie] = useCookies(["token"]);
  const [profil, setProfil] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookie.token;

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

  return (
    <div className="navbar bg-base-100 w-11/12 mx-auto">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          <Link to={"/"}>
            <img
              src="images/prestalogo.png"
              alt="Logo Presta"
              className="w-12"
            />
          </Link>
        </a>
      </div>
      {token && !loading ? (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {profil.map((item: Profile) => (
                  <img alt="User avatar" key={item.id} src={item.avatar} />
                ))}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-green-900 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <LogOut />
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <SigninButton />
        </div>
      )}
    </div>
  );
};

export default Header;
