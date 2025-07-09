
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface AboutProps {}

const About: React.FC<AboutProps> = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

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
            <Link
              to="/"
              className="text-sm sm:text-base lg:text-lg font-medium text-purple-400 hover:text-purple-400 transition-colors duration-200"
            >
              Home
            </Link>
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

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className={`${
          darkMode
            ? "bg-gradient-to-br from-gray-900 to-purple-900"
            : "bg-gradient-to-br from-purple-100 to-teal-100"
        } w-full`}
      >
        <section
          className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 max-w-6xl mx-auto w-full"
          id="about"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
            About YAMA
          </h1>
          <div className="w-full max-w-3xl lg:max-w-4xl mx-auto">
            <h2
              className={`text-xl sm:text-2xl font-bold mb-4 text-center ${
                darkMode ? "text-teal-200" : "text-gray-800"
              }`}
            >
              Built to Motivate. Designed to Empower.
            </h2>
            <p
              className={`text-base sm:text-lg mb-8 ${
                darkMode ? "text-teal-300" : "text-gray-700"
              }`}
            >
              YAMA (Young Athlete Motivation App) is a platform built to inspire
              the next generation of athletes through powerful, personal, and
              authentic stories from those who’ve walked the path before them.
              Whether it’s a message about bouncing back from injury, staying
              disciplined during tough seasons, or finding purpose beyond the
              game, YAMA brings real voices to young athletes right when they
              need it most.
            </p>

            {/* Mission Section */}
            <div className="mb-8">
              <h2
                className={`text-xl sm:text-2xl font-bold mb-4 ${
                  darkMode ? "text-teal-200" : "text-gray-800"
                }`}
              >
                Our Mission
              </h2>
              <p
                className={`text-base sm:text-lg ${
                  darkMode ? "text-teal-300" : "text-gray-700"
                }`}
              >
                We created YAMA to answer a simple but powerful question:
                <br />
                <span className="italic">
                  “What if every young athlete could hear just the right words
                  at just the right time?”
                </span>
                <br />
                We believe the best motivation comes from real people, not
                algorithms. On YAMA, professional and amateur athletes share
                short, focused videos on topics that matter—resilience,
                teamwork, self-belief, and more. Young athletes can personalize
                their experience, track their journey, and build confidence both
                on and off the field.
              </p>
            </div>

            {/* Who We Are Section */}
            <div className="mb-8">
              <h2
                className={`text-xl sm:text-2xl font-bold mb-4 ${
                  darkMode ? "text-teal-200" : "text-gray-800"
                }`}
              >
                Who We Are
              </h2>
              <p
                className={`text-base sm:text-lg ${
                  darkMode ? "text-teal-300" : "text-gray-700"
                }`}
              >
                YAMA was created by The Maize Lab, a startup incubator based in
                Ann Arbor, Michigan, founded by current and former University of
                Michigan students and athletes.
                <br />
                At The Maize Lab, we believe great technology can do more than
                make money—it can make a difference. Our team builds apps that
                are:
                <ul className="list-disc pl-6 mt-2">
                  <li>💡 Financially promising</li>
                  <li>🎯 Fun to build</li>
                  <li>🌍 Good for society</li>
                </ul>
                YAMA is the perfect expression of that philosophy—combining
                tech, sports, education, and purpose.
              </p>
            </div>

            {/* Why We Built YAMA Section */}
            <div className="mb-8">
              <h2
                className={`text-xl sm:text-2xl font-bold mb-4 ${
                  darkMode ? "text-teal-200" : "text-gray-800"
                }`}
              >
                Why We Built YAMA
              </h2>
              <p
                className={`text-base sm:text-lg ${
                  darkMode ? "text-teal-300" : "text-gray-700"
                }`}
              >
                We know firsthand the ups and downs of being a young athlete.
                The pressure. The self-doubt. The early mornings and late
                nights. We also know how one piece of encouragement—one story,
                one moment, one mentor—can change everything.
                <br />
                With YAMA, we’ve created a space where motivation is always just
                a tap away, and where every young athlete feels seen, supported,
                and inspired.
              </p>
            </div>

            {/* Join the Movement Section */}
            <div>
              <h2
                className={`text-xl sm:text-2xl font-bold mb-4 ${
                  darkMode ? "text-teal-200" : "text-gray-800"
                }`}
              >
                Join the Movement
              </h2>
              <p
                className={`text-base sm:text-lg ${
                  darkMode ? "text-teal-300" : "text-gray-700"
                }`}
              >
                Whether you're a young athlete looking for guidance, or an
                athlete ready to give back by sharing your story—YAMA is for
                you.
                <br />
                Together, we’re building more than an app.
                <br />
                We’re building a community of motivated athletes helping each
                other grow.
              </p>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Footer */}
      <footer
        className={`py-8 px-4 sm:px-6 lg:px-16 ${
          darkMode
            ? "bg-gradient-to-br from-gray-800 to-purple-900 text-teal-200"
            : "bg-gradient-to-br from-purple-50 to-teal-50 text-gray-800"
        } text-center w-screen mx-auto`}
      >
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6">
          {["About", "Privacy", "Terms"].map((item) => (
            <Link
              key={item}
              to={
                item === "Privacy"
                  ? "/privacy-policy"
                  : item === "Terms"
                  ? "/terms"
                  : "/about"
              }
              className={`text-sm sm:text-base font-medium ${
                item === "About" ? "text-purple-400" : ""
              } hover:text-purple-400 transition-colors ${
                darkMode ? "text-teal-200" : "text-gray-800"
              }`}
            >
              {item}
            </Link>
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

export default About;