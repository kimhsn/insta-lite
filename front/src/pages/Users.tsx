import React, { useContext, useEffect, useState } from "react";
import { GlobalStyle } from "../Styles/global";
import { SideBar } from "../components/Sidebar/Index";

const Users = () => {
  
  useEffect(() => {
   
  }, []);

  const [users,setUsers] = useState([]);

  const usersData = [
    {
      id: 1,
      nom: "tnaket",
      prenom: "Clark Kent",
      role: "https://unsplash.it/200/200",
      email: "admin",
      date: "date",
    },
    {
        id: 2,
        nom: "htchoun",
        prenom: "Clark Kent",
        role: "https://unsplash.it/200/200",
        email: "admin",
        date: "date",
      },
  ];

  return (
    <>
      <SideBar />
      <GlobalStyle />
      <div className="container mx-auto px-4 sm:px-8">
  <div className="py-8">
    <div>
      <h2 className="text-2xl font-semibold leading-tight">Liste des utilisateurs</h2>
    </div>
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div
        className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
      >
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Utilisateur
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Date de création
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
              >

              </th>
            </tr>
          </thead>
          <tbody>
            {usersData.map(user => (
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
                           {user.nom}
                        </p>
                        <p className="text-gray-600 whitespace-no-wrap">000004</p>
                        </div>
                    </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">16 Dec 29</p>
                    
                    </td>
                    
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                    >
                        <span
                        aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Admin</span>
                    </span>
                    </td>
                    <td
                    className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right"
                    >
                    
                    </td>
               </tr>
            ))}
           
           
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