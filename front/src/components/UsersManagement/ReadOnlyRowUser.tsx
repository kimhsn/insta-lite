import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

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
  deleteUser: (value: number) => void;
  getUserToUpdate: (value: number) => void;
};
const ReadOnlyRowUser = (props: Props) => {
  const { user, deleteUser, getUserToUpdate } = props;
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
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {user.prenom} {user.nom}
            </p>
            <p className="text-gray-600 whitespace-no-wrap">{user.email}</p>
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
              className="absolute inset-0 bg-green-300 opacity-50 rounded-full"
            ></span>
            <span className="relative">{user.appRoles.roleName}</span>
          </span>
        ) : (
          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden
              className="absolute inset-0 bg-blue-300 opacity-50 rounded-full"
            ></span>
            <span className="relative">{user.appRoles.roleName}</span>
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
  );
};

export default ReadOnlyRowUser;
