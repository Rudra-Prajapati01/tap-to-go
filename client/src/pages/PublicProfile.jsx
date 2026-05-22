import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

const PublicProfile = () => {

  const { uniqueId } =
    useParams();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchUser();

  }, []);

  const fetchUser = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/users/${uniqueId}`
      );

      setUser(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        Loading...

      </div>

    );

  }

  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">

        User Not Found

      </div>

    );

  }

  // QR DISABLED
  if (!user.qrActive) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-black text-white text-3xl font-bold">

        QR Code Disabled

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#FFE6E6] via-[#FFABE1] to-[#A685E2] flex items-center justify-center p-5">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-[30px] shadow-2xl overflow-hidden">

        {/* COVER */}
        <div className="h-40 bg-gradient-to-r from-[#6155A6] to-[#A685E2]"></div>

        {/* PROFILE IMAGE */}
        <div className="flex justify-center -mt-16">

          <img
            src={user.profileImage}
            alt=""
            className="w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
          />

        </div>

        {/* CONTENT */}
        <div className="p-6 text-center">

          <h1 className="text-3xl font-bold text-[#6155A6]">

            {user.name}

          </h1>

          <p className="text-gray-500 mt-1">

            @{user.username}

          </p>

          <p className="mt-4 text-gray-700">

            {user.bio || "Welcome to my Tap To Go profile 🚀"}

          </p>

          {/* SOCIALS */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">

            {user.instagram && (
              <a
                href={user.instagram}
                target="_blank"
                className="px-4 py-2 rounded-full bg-pink-500 text-white"
              >
                Instagram
              </a>
            )}

            {user.linkedin && (
              <a
                href={user.linkedin}
                target="_blank"
                className="px-4 py-2 rounded-full bg-blue-600 text-white"
              >
                LinkedIn
              </a>
            )}

            {user.github && (
              <a
                href={user.github}
                target="_blank"
                className="px-4 py-2 rounded-full bg-black text-white"
              >
                GitHub
              </a>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default PublicProfile;