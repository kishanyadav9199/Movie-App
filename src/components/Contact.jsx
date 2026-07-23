import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const Contact = () => {
  document.title = "MovieZone | Contact";

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-[#1F1E24] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="text-3xl text-zinc-400 hover:text-[#6556CD] transition"
          >
            <i className="ri-arrow-left-line"></i>
          </button>

          <div>
            <h1 className="text-4xl font-bold text-[#6556CD]">Contact Us</h1>
            <p className="text-zinc-400 mt-2">
              We'd love to hear from you! If you have any questions, feedback,
              or suggestions about MovieZone, feel free to get in touch.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-[#2A2930] rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6556CD]">
                <i className="ri-user-fill text-xl"></i>
              </div>

              <div>
                <h3 className="font-semibold">Name</h3>
                <p className="text-zinc-400">Kishan Kumar</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6556CD]">
                <i className="ri-mail-fill text-xl"></i>
              </div>

              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-zinc-400">wwwkishan763@gmail.com</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6556CD]">
                <i className="ri-phone-fill text-xl"></i>
              </div>

              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-zinc-400">+919199970983</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6556CD]">
                <i className="ri-map-pin-fill text-xl"></i>
              </div>

              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-zinc-400">Bhopal, Madhya Pradesh, India</p>
              </div>
            </div>

            {/* Support Hours */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#6556CD]">
                <i className="ri-time-fill text-xl"></i>
              </div>

              <div>
                <h3 className="font-semibold">Support Hours</h3>
                <p className="text-zinc-400">
                  Monday – Saturday
                  <br />
                  9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-zinc-700 pt-6 text-center">
          <p className="text-zinc-500">
            © {new Date().getFullYear()} MovieZone. Built with React, Tailwind
            CSS & TMDB API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
