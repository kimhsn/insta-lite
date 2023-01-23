import React from "react";
import { InputBase } from "@mui/material";
import { AiOutlineCheck } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  appRoles: {
    roleName: string;
  };
};

type Props = {
  user: User;
  setNewFirstName: (value: string) => void;
  setNewLastName: (value: string) => void;
  setNewEmail: (value: string) => void;
  setNewRole: (value: string) => void;
  updateUser: (value: number) => void;
  setIdUserToEdit: (value: number) => void;
};
const EditableRowUser = (props: Props) => {
  const {
    user,
    setNewFirstName,
    setNewLastName,
    setNewEmail,
    setNewRole,
    updateUser,
    setIdUserToEdit,
  } = props;
  return (
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
                onChange={(e) => setNewFirstName(e.target.value)}
              />
              <InputBase
                placeholder={user.nom}
                className="ml-2"
                onChange={(e) => setNewLastName(e.target.value)}
              />
            </p>
            <p className="text-gray-600   whitespace-no-wrap">
              <InputBase
                placeholder={user.email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">16 Dec 29</p>
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
  );
};

export default EditableRowUser;
