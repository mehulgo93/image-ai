"use client";

import Head from "next/head";
import { NextPage } from "next";

const Profile: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-100 font-sans text-gray-900">
      <Head>
        <title>FriendConnect Profile</title>
        <meta
          name="description"
          content="Your personal profile on FriendConnect."
        />
        <link rel="icon" href="/friendconnect-icon.png" />
      </Head>

      <header className="w-full bg-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">FriendConnect</h1>
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-lg hover:bg-blue-200 transition-all">
          Log Out
        </button>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto p-8">
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-4">
            <div className="w-24 h-24 bg-blue-300 rounded-full flex-shrink-0 overflow-hidden">
              <img
                src="/profile-picture-placeholder.jpg"
                alt="Profile Picture"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ml-6">
              <h2 className="text-4xl font-bold text-gray-900">John Doe</h2>
              <p className="text-lg text-gray-600">
                Exploring the world one friend at a time.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-3xl text-blue-600 mb-4">About Me</h3>
          <p className="text-lg text-gray-700">
            Hi! I'm John, a software enthusiast, adventurer, and coffee lover. I
            enjoy making new connections and sharing interesting moments from my
            life. Welcome to my profile!
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-3xl text-blue-600 mb-4">Recent Posts</h3>
          <div className="space-y-6">
            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900">
                A Day at the Beach
              </h4>
              <p className="text-gray-700">
                Had an amazing time relaxing by the ocean today! The weather was
                perfect, and I met some really cool people along the way.
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900">
                Coffee Meetup
              </h4>
              <p className="text-gray-700">
                Great conversation over some freshly brewed coffee at my
                favorite café. Looking forward to more of these casual meetups!
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full bg-blue-600 p-6 text-center text-white">
        <p>FriendConnect - Bringing the world closer, one friend at a time.</p>
      </footer>
    </div>
  );
};

export default Profile;

// This is a profile page styled similarly to FriendConnect's landing page, with personal information,
// a profile picture, and recent posts. It retains the blue and white color scheme for consistency.
