import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div className="flex flex-col justify-center items-center h-96 m-8 bg-[#D9D9D9] rounded-xl  text-white">
      <img className="rounded-full w-32 h-32 mx-5" src={user.picture} alt={user.name} />
      <p className="mt-2 text-black">{user.email}</p>
    </div>
  ) : null;
};

export default Profile;
