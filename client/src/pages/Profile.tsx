import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface ProfileData {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
  };

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [logInStatus, setLogInStatus] = useState<Boolean>(false);
  const [logOutStatus, setLogOutStatus] = useState<Boolean>(true);
  const [loader, setLoader] = useState<Boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    // Check if the user is logged in
    const checkLogin = () => {
      if (token) {
        setLogInStatus(true);
        setLogOutStatus(false);
      } else {
        setLogInStatus(false);
        setLogOutStatus(true);
      }
    };
    checkLogin();

    // Fetch profile data if logged in
    const fetchProfileData = async () => {
      const token = localStorage.getItem("jwt");
      if (!token) return;
      try {
        setLoader(true);
        const response = await axios.get("/profile/userProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setLoader(false);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        {loader && <div>Loading profile data...</div>}

        {logOutStatus && (
          <div className="flex flex-col gap-3 justify-center items-center text-xl font-thin">
            <p>To view your profile, you have to log in first.</p>
            <div className="flex flex-row gap-3">
              <Link to="/login" className="bg-gray-400 px-3 py-2 rounded-lg">
                Login
              </Link>
              <Link to="/signup" className="bg-gray-400 px-3 py-2 rounded-lg">
                SignUp
              </Link>
            </div>
          </div>
        )}
        {logInStatus && profileData && (
          <div className="flex p-4 flex-col gap-4 border border-black rounded-lg">
            <h1>Profile Card</h1>
            <p>Hello, {profileData.name}</p>
            <p>Email: {profileData.email}</p>
            {profileData.image && <img src={profileData.image} alt="Profile" />}
            <div>
              <button
                onClick={handleLogout}
                className="bg-gray-400 px-3 py-1 rounded-lg"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
