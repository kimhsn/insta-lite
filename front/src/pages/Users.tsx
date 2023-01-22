import React, { useContext, useEffect, useState } from "react";
import { GlobalStyle } from "../Styles/global";
import { SideBar } from "../components/Sidebar/Index";
import axios from "axios";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import InputBase from "@mui/material/InputBase";

const URL = "http://localhost:8080/insta/users";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [idUserToEdit, setIdUserToEdit] = useState<number>(0);
  const [newRole, setNewRole] = useState<string>("");
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  console.log(newEmail);
  const getUsers = async () => {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ0NTE0NTUsImlhdCI6MTY3NDQyMTQ1NX0.WQZmgSPt0edsfibAXiaH1HouEt2naYXHw-978TrCnJM`,
      },
    });
    setUsers(response.data);
  };
  const deleteUser = async (id: number) => {
    await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ0NTE0NTUsImlhdCI6MTY3NDQyMTQ1NX0.WQZmgSPt0edsfibAXiaH1HouEt2naYXHw-978TrCnJM`,
      },
    });
    getUsers();
  };
  const getUserToUpdate = async (id: number) => {
    setIdUserToEdit(id);
    const response = await axios.get(`${URL}/findById/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ0NTE0NTUsImlhdCI6MTY3NDQyMTQ1NX0.WQZmgSPt0edsfibAXiaH1HouEt2naYXHw-978TrCnJM`,
      },
    });
    setNewRole(response.data.appRoles.roleName);
    setNewFirstName(response.data.prenom);
    setNewLastName(response.data.nom);
    setNewEmail(response.data.email);
  };
  const updateUser = async (id: number) => {
    const response = await axios.put(
      `${URL}/${id}`,
      {
        nom: newLastName,
        prenom: newFirstName,
        email: newEmail,
        appRoles: {
          roleName: newRole,
        },
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ0NTE0NTUsImlhdCI6MTY3NDQyMTQ1NX0.WQZmgSPt0edsfibAXiaH1HouEt2naYXHw-978TrCnJM`,
        },
      }
    );

    setIdUserToEdit(0);
    getUsers();
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <SideBar />
      <GlobalStyle />
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Liste des utilisateurs
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date de création
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user: any) => {
                    return (
                      <>
                        {user.id == idUserToEdit ? (
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3 h-5">
                                  <p className="text-gray-900 mt-0 h-5 whitespace-no-wrap">
                                    <InputBase
                                      className="w-12 "
                                      placeholder={user.prenom}
                                      onChange={(e) =>
                                        setNewFirstName(e.target.value)
                                      }
                                    />
                                    <InputBase
                                      placeholder={user.nom}
                                      className="ml-2"
                                      onChange={(e) =>
                                        setNewLastName(e.target.value)
                                      }
                                    />
                                  </p>
                                  <p className="text-gray-600   whitespace-no-wrap">
                                    <InputBase
                                      placeholder={user.email}
                                      onChange={(e) =>
                                        setNewEmail(e.target.value)
                                      }
                                    />
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                16 Dec 29
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {user.appRoles.roleName === "ADMIN" ? (
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    className="absolute inset-0 bg-green-300   rounded-full"
                                  ></span>
                                  <select
                                    className="relative bg-green-300 opacity-100 rounded-full"
                                    onChange={(e) => setNewRole(e.target.value)}
                                  >
                                    <option value={"ADMIN"}>Admin</option>
                                    <option value={"USER"}>Utilisateur</option>;
                                  </select>
                                </span>
                              ) : (
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    className="absolute inset-0 bg-blue-300   rounded-full"
                                  ></span>
                                  <select
                                    className="relative bg-blue-300 opacity-100 rounded-full"
                                    onChange={(e) => setNewRole(e.target.value)}
                                  >
                                    <option value={"USER"}>Utilisateur</option>;
                                    <option value={"ADMIN"}>Admin</option>
                                  </select>
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                              <AiOutlineCheck
                                cursor={"pointer"}
                                color="green"
                                size="25px"
                                onClick={() => updateUser(user.id)}
                              />
                            </td>{" "}
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                              <TiArrowBack
                                cursor={"pointer"}
                                onClick={() => setIdUserToEdit(0)}
                                color="red"
                                size="25px"
                              />
                            </td>
                          </tr>
                        ) : (
                          <tr>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <div className="flex">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img
                                    className="w-full h-full rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {user.prenom} {user.nom}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                16 Dec 29
                              </p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {user.appRoles.roleName === "ADMIN" ? (
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    className="absolute inset-0 bg-green-300 opacity-50 rounded-full"
                                  ></span>
                                  <span className="relative">
                                    {user.appRoles.roleName}
                                  </span>
                                </span>
                              ) : (
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden
                                    className="absolute inset-0 bg-blue-300 opacity-50 rounded-full"
                                  ></span>
                                  <span className="relative">
                                    {user.appRoles.roleName}
                                  </span>
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                              <FaEdit
                                cursor={"pointer"}
                                color="blue"
                                size="25px"
                                onClick={() => getUserToUpdate(user.id)}
                              />
                            </td>{" "}
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                              <AiFillDelete
                                cursor={"pointer"}
                                onClick={() => deleteUser(user.id)}
                                color="red"
                                size="25px"
                              />
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
