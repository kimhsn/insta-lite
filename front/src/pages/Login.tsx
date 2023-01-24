import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Auth/Footer";
import axios from "axios";
// icons
import { ImFacebook2 as FacebookIcon } from "react-icons/im";
import { AiFillEye as EyeIcon } from "react-icons/ai";
import { AiFillEyeInvisible as EyeInvisibleIcon } from "react-icons/ai";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";

//images
import loginSide from "../assets/login-side-img.png";
import githubImg from "../assets/get-it-on-github.png";
import logo from "../assets/logo.png";
import logoFull from "../assets/logo-full.png";

// utilities
import { isValidEmail } from "../utility";
import { LoginContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../pages/utils";

const LOGIN_URL = "http://localhost:8080/insta/auth/authenticate";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [api, setApi] = useState("http://localhost:8080");

  const navigate = useNavigate();

  const { user, setUser } = useContext(LoginContext);

  useEffect(() => {}, []);

  //Call api login

  const handleSubmit = async (email: string, password: string) => {
    const response = await axios
      .post(
        LOGIN_URL,
        JSON.stringify({
          login: email,
          password: password,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          //changeToken(response.data.token);
          let token = response.data.accesToken;
          let refrechToken = response.data.refreshToken;
          //get user informations
          axios
            .get(`${api}/insta/users/findByMail/${email}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((responseF) => {
              if (responseF.status === 200) {
                let user: User = {
                  id: responseF.data.id,
                  email: responseF.data.email,
                  nom: responseF.data.nom,
                  prenom: responseF.data.prenom,
                  role: responseF.data.appRoles.roleName,
                  jwt: token,
                  refrechJwt: refrechToken,
                };
                setUser(user);
                setFormLoading(false);
                navigate("/home");
              }
            });
        }
      });
  };

  const showError = (error: any) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (!isValidEmail(email)) showError("Invalid email address");
    else if (password.length < 4)
      showError("Password must be at least 6 characters");
    if (isValidEmail(email) && password.length >= 4) {
      setFormLoading(true);
      //const user = await Login(email, password);
      handleSubmit(email, password);
    }
  };

  useEffect(() => {
    setDisabled(email.length > 0 && password.length > 0 ? false : true);
  }, [email, password]);

  return (
    <>
      <div className="h-screen w-screen flex flex-wrap items-center justify-center p-3">
        <div className="flex items-center">
          <div className="hidden md:block">
            <img src={loginSide} className="max-h-[500px]" alt="login" />
          </div>
          <div className="flex flex-col flex-shrink-0 w-[350px]">
            <div className="flex flex-col items-center justify-center rounded w-full border-[1px] border-gray-300 bg-white p-6">
              <div className="w-full">
                <img
                  src={logoFull}
                  className="h-14 mt-4 mx-auto my-3"
                  alt="instagram"
                />
              </div>
              <div className="w-full px-5">
                <form
                  className=""
                  method="POST"
                  onSubmit={(e) => submitForm(e)}
                >
                  <div className="w-full">
                    <div className="w-full">
                      <div className="w-full mb-3">
                        <input
                          placeholder="entrez votre email"
                          name="username"
                          type="text"
                          className="text-xs p-2 border-[1px] rounded bg-gray-200/10 w-full border-gray-300"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="relative">
                        <input
                          type={showPassword ? "password" : "text"}
                          className="text-xs p-2 border-[1px] rounded bg-gray-200/10 w-full border-gray-300"
                          placeholder="Mot de passe"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        {password.length > 0 && (
                          <div className="absolute top-0 right-2 h-full flex items-center">
                            <button
                              className="cursor-pointer text-slate-800"
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeIcon />
                              ) : (
                                <EyeInvisibleIcon />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full mt-2">
                      <button
                        className="w-full bg-blue-400 text-xs text-white font-semibold p-1 rounded-sm"
                        disabled={disabled}
                        type="submit"
                      >
                        {formLoading ? (
                          <SpinnerIcon className="w-3 h-3 animate-spin my-1 mx-auto" />
                        ) : (
                          "Se Connecter"
                        )}
                      </button>
                    </div>

                    <div className="my-4 "></div>
                  </div>
                  {errorMsg?.length > 0 && (
                    <div className="text-center text-xs my-4 text-red-600">
                      {errorMsg}
                    </div>
                  )}
                  <div className="text-center w-full text-xs font-thin mb-4">
                    <a href="/forgot-password">Mot de passe oublié</a>
                  </div>
                </form>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded w-full border-[1px] border-gray-300 mt-4 bg-white p-6">
              <div className="text-sm">
                Vous avez pas un compte ?{" "}
                <Link to="/register" className="text-blue-500 font-semibold">
                  S'inscrire
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded w-full mt-4">
              <p className="text-sm ">Obtenir l'application</p>
              <a
                target="_blank"
                href="https://github.com/kimhsn/insta-lite"
                className="text-sm"
              >
                <img src={githubImg} className="h-16" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
