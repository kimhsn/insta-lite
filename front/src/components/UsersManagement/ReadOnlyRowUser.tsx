import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import scLogo from "../../assets/scLogo.jpg";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  creationData: string;
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

  const formateDate : any = (date: any) => {
    var d = new Date(""+date);
    user.creationData = d.toISOString().substring(0, 10);
    return user.creationData
  }

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex">
          <div className="flex-shrink-0 w-10 h-10">
            <img className="w-full h-full rounded-full" src={scLogo} alt="" />
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
        <p className="text-gray-900 whitespace-no-wrap">
           {formateDate(user.creationData)}
        </p>
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
