import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className="flex justify-center items-center h-full">
        <img className="rounded-full mx-5" src={user.picture} alt={user.name} />
        <p>{user.email}</p>
        <LogoutButton />
      </div>
    )
  );
};

export default Profile;
