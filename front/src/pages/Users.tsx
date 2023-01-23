import React, { useContext, useEffect, useState } from "react";
import { GlobalStyle } from "../Styles/global";
import { SideBar } from "../components/Sidebar/Index";
import axios from "axios";
import { LoginContext } from "../context/AuthContext";
import EditableRowUser from "../components/UsersManagement/EditableRowUser";
import ReadOnlyRowUser from "../components/UsersManagement/ReadOnlyRowUser";

const URL = "http://localhost:8080/insta/users";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [idUserToEdit, setIdUserToEdit] = useState<number>(0);
  const [newRole, setNewRole] = useState<string>("");
  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const { user, setUser } = useContext(LoginContext);

  const getUsers = async () => {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ1MzAyODYsImlhdCI6MTY3NDUwMDI4Nn0.93i766CekqNxJKDiwSSQb5UtwMgOOlZLaNsoGaZ60V4`,
      },
    });
    setUsers(response.data);
  };

  const deleteUser = async (id: number) => {
    await axios.delete(`${URL}/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ1MzAyODYsImlhdCI6MTY3NDUwMDI4Nn0.93i766CekqNxJKDiwSSQb5UtwMgOOlZLaNsoGaZ60V4`,
      },
    });
    getUsers();
  };

  const getUserToUpdate = async (id: number) => {
    setIdUserToEdit(id);
    const response = await axios.get(`${URL}/findById/${id}`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ1MzAyODYsImlhdCI6MTY3NDUwMDI4Nn0.93i766CekqNxJKDiwSSQb5UtwMgOOlZLaNsoGaZ60V4`,
      },
    });
    setNewRole(response.data.appRoles.roleName);
    setNewFirstName(response.data.prenom);
    setNewLastName(response.data.nom);
    setNewEmail(response.data.email);
  };

  const updateUser = async (id: number) => {
    await axios.put(
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ1MzAyODYsImlhdCI6MTY3NDUwMDI4Nn0.93i766CekqNxJKDiwSSQb5UtwMgOOlZLaNsoGaZ60V4`,
        },
      }
    );
    await axios.post(
      `${URL}/addRoleToUser`,
      {
        email: newEmail,
        roleName: newRole,
      },
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjFAZ21haWwiLCJyb2xlcyI6WyJBRE1JTiJdLCJleHAiOjE2NzQ1MzAyODYsImlhdCI6MTY3NDUwMDI4Nn0.93i766CekqNxJKDiwSSQb5UtwMgOOlZLaNsoGaZ60V4`,
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
                        {user.id === idUserToEdit ? (
                          <EditableRowUser
                            user={user}
                            setIdUserToEdit={setIdUserToEdit}
                            updateUser={updateUser}
                            setNewEmail={setNewEmail}
                            setNewFirstName={setNewFirstName}
                            setNewLastName={setNewLastName}
                            setNewRole={setNewRole}
                          />
                        ) : (
                          <ReadOnlyRowUser
                            user={user}
                            getUserToUpdate={getUserToUpdate}
                            deleteUser={deleteUser}
                          />
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
