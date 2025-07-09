import React, { useState } from "react";
import FileUploader from "../component/FileUploader";
import { motion } from "framer-motion";
import Accordion from "../component/Accordion";
import { Link } from "react-router-dom";

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(
    "https://dr5mfoj5gztc2.cloudfront.net/Coach+Prime+Pregame.MP4"
  );
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Handle upload status changes from FileUploader
  const handleUploadStatusChange = (status: string) => {
    setUploadStatus(status);
    setShowAlert(true);
    if (status.includes("successfully") || status.includes("Failed")) {
      setTimeout(() => setShowAlert(false), 5000);
    }
  };

  const creators = [
    {
      id: 1,
      name: "Kundan Singh",
      title: "Frontend Developer",
      avatar:
        "https://media.licdn.com/dms/image/v2/D5603AQElllvV2Y6yfQ/profile-displayphoto-shrink_400_400/B56Zb5dPApGsAg-/0/1747941914561?e=1755129600&v=beta&t=H8A1GfyHCj_LccLfU-X-lXm923ON6VEjGUb8U8g2Gjg",
    },
    {
      id: 2,
      name: "Gaurav Srisundar",
      title: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
  ];

  const videoSources = [
    {
      id: 1,
      title: "Motivation Video 1",
      src: "https://dr5mfoj5gztc2.cloudfront.net/Coach+Prime+Pregame.MP4",
    },
    {
      id: 2,
      title: "Motivation Video 2",
      src: "https://dr5mfoj5gztc2.cloudfront.net/Coach+Prime+Pregame.MP4",
    },
    {
      id: 3,
      title: "Motivation Video 3",
      src: "https://dr5mfoj5gztc2.cloudfront.net/Coach+Prime+Pregame.MP4",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 w-screen ${
        darkMode ? "bg-gray-900 text-teal-100" : "bg-gray-100 text-gray-900"
      } font-sans`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`${
          darkMode ? "bg-gray-800/90" : "bg-white/90"
        } shadow-xl sticky top-0 z-20 w-full`}
      >
        <header
          className={`flex flex-col sm:flex-row justify-between items-center px-4 py-3 sm:px-6 sm:py-4 lg:px-12 backdrop-blur-md ${
            darkMode ? "bg-gray-800/90" : "bg-white/90"
          } max-w-6xl mx-auto w-full`}
        >
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 tracking-tight mb-2 sm:mb-0">
            Yama
          </div>
          <nav className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 lg:gap-8">
            {["Home", "Upload", "Explore"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm sm:text-base lg:text-lg font-medium hover:text-purple-400 transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-purple-500/20 hover:bg-purple-500/40 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </nav>
        </header>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`relative ${
          darkMode
            ? "bg-gradient-to-br from-gray-900 to-purple-900"
            : "bg-gradient-to-br from-purple-100 to-teal-100"
        } w-full`}
      >
        <section
          className={`min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-12 sm:px-6 sm:py-16 lg:px-16 lg:py-20 max-w-6xl mx-auto w-full`}
          id="home"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
            Yama: Young Athlete Motivation App
          </h1>
          <div className="w-full max-w-2xl lg:max-w-4xl mx-auto text-center">
            <p
              className={`text-lg sm:text-xl lg:text-2xl font-semibold mb-4 ${
                darkMode ? "text-teal-200" : "text-gray-800"
              }`}
            >
              What We Need
            </p>
            <p
              className={`text-base sm:text-lg lg:text-xl mb-6 ${
                darkMode ? "text-teal-300" : "text-gray-700"
              }`}
            >
              A 90-second YAMA video of you motivating young athletes to reach
              their peak potential.
            </p>
          </div>

          {/* Accordion */}
          <div className="w-full max-w-2xl lg:max-w-4xl mx-auto">
            <Accordion
              darkMode={darkMode}
              title="Who it’s For"
              subtitle="12-20 year olds who need guidance and motivation but can’t afford it all"
            >
              <p className={darkMode ? "text-teal-300" : "text-gray-700"}>
                We are building the YAMA app, a free platform for young athletes
                seeking guidance and motivation from top performers. In a world
                full of noise, it’s hard to find reliable advice. Our library of
                videos features insights from the greats who’ve been there and
                done it.
              </p>
            </Accordion>
            <Accordion
              darkMode={darkMode}
              title="What Topic Should You Talk About?"
              subtitle="Physical Fitness, Mental Fitness, or Life Skills"
            >
              <p className={darkMode ? "text-teal-300" : "text-gray-700"}>
                Physical Fitness: Nutrition, Sleep, Recovery Tips, Injury
                Recovery, Training Regimens, Strength & Conditioning.
                <br />
                Mental Fitness: Performance Assessment, Handling Adversity,
                Finding Balance, Patience, Journaling, Visualization, Gameday
                Prep.
                <br />
                Life Skills: Finances, Academics, Dangers of Drug Use, Social
                Media.
              </p>
            </Accordion>
            <Accordion
              darkMode={darkMode}
              title="Tips for a Good Video"
              subtitle="Good lighting, eye level, and camera a few feet away"
            >
              <p className={darkMode ? "text-teal-300" : "text-gray-700"}>
                - Hold the camera at eye level, an arm’s length away.
                <br />
                - Aim for 1-2 minutes in length.
                <br />
                - Film vertically with good lighting.
                <br />
                - Practice before recording your final version.
                <br />- Target audience: athletes aged 12-18, eager to learn
                with minimal prior knowledge.
              </p>
            </Accordion>
            <Accordion
              darkMode={darkMode}
              title="Do I Get Paid for Doing This?"
              subtitle="Most volunteer for free, but you can earn YAMA stock"
            >
              <p className={darkMode ? "text-teal-300" : "text-gray-700"}>
                Contributors can earn YAMA stock as compensation for video
                submissions. Click here to learn more about earning
                opportunities.
              </p>
            </Accordion>
          </div>
        </section>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-purple-900"
            : "bg-gradient-to-br from-purple-50 to-teal-50"
        } shadow-xl w-full`}
      >
        <section
          className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-16 max-w-6xl mx-auto w-full`}
          id="upload"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
            Upload Your Video
          </h2>
          {/* Alert for upload status */}
          {showAlert && uploadStatus && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-6 px-6 py-3 rounded-lg text-white text-base font-semibold shadow-lg z-[1000] max-w-md mx-auto text-center
                ${
                  uploadStatus.includes("successfully")
                    ? "bg-green-600"
                    : uploadStatus.includes("Uploading")
                    ? "bg-blue-600"
                    : "bg-red-600"
                }`}
            >
              {uploadStatus}
            </motion.div>
          )}
          <div className="w-full max-w-lg lg:max-w-2xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`p-6 backdrop-blur-sm`}
            >
              <FileUploader
                isDark={darkMode}
                onUploadStatusChange={handleUploadStatusChange}
              />
            </motion.div>
            {/* Success/Error Message */}
            {uploadStatus &&
              (uploadStatus.includes("successfully") ||
                uploadStatus.includes("Failed")) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`text-center text-sm font-medium mt-6 ${
                    darkMode ? "text-teal-200" : "text-gray-700"
                  }`}
                >
                  {uploadStatus.includes("successfully") ? (
                    <p>
                      Your video was uploaded! Our team will review it for
                      quality and then share it with Young Athletes everywhere!
                      Thank you for contributing to YAMA!
                    </p>
                  ) : (
                    <p>
                      Your video could not be uploaded. Please check your file
                      and try again.
                    </p>
                  )}
                </motion.div>
              )}
          </div>
        </section>
      </motion.div>

      {/* Explore Section with Video Player */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className={`${
          darkMode
            ? "bg-gradient-to-br from-gray-900 to-purple-900"
            : "bg-gradient-to-br from-purple-50 to-teal-50"
        } shadow-xl w-full`}
      >
        <section
          className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 max-w-6xl mx-auto w-full"
          id="explore"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
            Videos from Other Pros
          </h2>
          <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`p-6 rounded-2xl shadow-lg ${
                darkMode ? "bg-gray-800/80" : "bg-white/80"
              } backdrop-blur-sm`}
            >
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px]">
                <video
                  className="w-full h-full rounded-lg mb-4 shadow-md object-contain"
                  controls
                  src={currentVideo}
                  poster="https://via.placeholder.com/800x450?text=Video+Thumbnail"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
                {videoSources.map((video) => (
                  <motion.button
                    key={video.id}
                    onClick={() => setCurrentVideo(video.src)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg text-left transition-all duration-300 ${
                      currentVideo === video.src
                        ? "bg-purple-500 text-white"
                        : darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-teal-200"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span className="font-medium text-sm sm:text-base">
                      {video.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>

      {/* Community Highlights */}
      <section
        className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-16 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-purple-900"
            : "bg-gradient-to-br from-purple-50 to-teal-50"
        } w-screen mx-auto`}
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
          More about Yama Community
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl lg:max-w-4xl mx-auto px-4">
          {/* {creators.map((creator) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${
                darkMode
                  ? "bg-gray-700 text-teal-200"
                  : "bg-white text-gray-900"
              } flex items-center`}
            >
              <img
                src={creator.avatar}
                alt={`${creator.name}'s avatar`}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4 object-cover border-2 border-purple-400"
              />
              <div>
                <p className="font-semibold text-base sm:text-xl">
                  {creator.name}
                </p>
                <p className={darkMode ? "text-teal-300" : "text-gray-600"}>
                  {creator.title}
                </p>
              </div>
            </motion.div>
          ))} */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className={`col-span-full p-8 rounded-xl shadow-md flex flex-col items-center justify-center gap-4 ${
              darkMode ? "bg-gray-700 text-teal-200" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
              Contact Us
            </h3>
            <p className={darkMode ? "text-teal-300" : "text-gray-700"}>
              Have questions, want to collaborate, or need support? Reach out to
              us!
            </p>
            <a
              href="mailto:colleborate@maize-lab.com"
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg font-semibold shadow hover:shadow-lg transition-all duration-200
                ${
                  darkMode
                    ? "bg-purple-600 text-white hover:bg-purple-500"
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v4"
                />
              </svg>
              colleborate@maize-lab.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 px-4 sm:px-6 lg:px-16 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-purple-900 text-teal-200"
            : "bg-gradient-to-br from-purple-50 to-teal-50 text-gray-800"
        } text-center w-screen mx-auto`}
      >
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
          {["About", "Terms", "Privacy-policy"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`text-sm sm:text-base font-medium hover:text-purple-400 transition-colors ${
                darkMode ? "text-teal-200" : "text-gray-800"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
        <p
          className={`text-xs sm:text-sm ${
            darkMode ? "text-teal-300" : "text-gray-600"
          }`}
        >
          Powered by Yama © 2025
        </p>
      </footer>
    </div>
  );
};

export default Home;
