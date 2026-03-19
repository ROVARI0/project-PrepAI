
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Modal from "../components/Modal";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
// import SpinnerLoader from "../components/Loader/SpinnerLoader";
const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard")
    }
  };
  return (
    <>
   
      <div className="w-full min-h-full bg-[#FFFCEF]">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">Interview Prep AI</div>
            {user ? (<ProfileInfoCard />) : (<button
              className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>)}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column */}
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              {/* Badge above heading */}
              <div className="flex items-center justify-left mb-4">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  AI Powered{" "}
                </div>
              </div>
              {/* Heading */}
              <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                {" "}
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered{" "}
                </span>{" "}
                Learning{" "}
              </h1>
              {/* Description */}
              <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                {" "}
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way. From
                preparation to mastery — your ultimate interview toolkit is
                here.{" "}
              </p>
              {/* CTA Button */}
              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                {" "}
                Get Started{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signup" && (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>

    </>
  );
};

export default LandingPage;
