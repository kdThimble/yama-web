
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface TermsProps {}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  darkMode: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, darkMode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full text-left p-4 rounded-lg font-semibold text-lg ${
          darkMode
            ? "bg-gray-700 text-teal-200 hover:bg-gray-600"
            : "bg-gray-50 text-gray-800 hover:bg-gray-100"
        } transition-colors flex justify-between items-center`}
      >
        {title}
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={`p-4 ${darkMode ? "text-teal-300" : "text-gray-700"}`}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

const Terms: React.FC<TermsProps> = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isConsented, setIsConsented] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleConsent = () => {
    setIsConsented(true);
    setTimeout(() => setIsConsented(false), 3000); // Reset after 3s for demo
  };

  const termsSections = [
    { id: "user-types", title: "1. User Types" },
    { id: "eligibility", title: "2. Eligibility" },
    { id: "contributor-content", title: "3. Motivational Contributor Content" },
    { id: "young-athlete", title: "4. Young Athlete Users" },
    { id: "account-deletion", title: "5. Account Deletion" },
    { id: "acceptable-use", title: "6. Acceptable Use" },
    { id: "intellectual-property", title: "7. Intellectual Property" },
    { id: "disclaimer", title: "8. Disclaimer" },
    { id: "liability", title: "9. Limitation of Liability" },
    { id: "privacy", title: "10. Privacy" },
    { id: "changes", title: "11. Changes to Terms" },
    { id: "contact", title: "12. Contact Us" },
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

      {/* Terms Section */}
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
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8">
          {/* Sticky Table of Contents */}
          <div className="lg:w-1/4">
            <div className="lg:sticky lg:top-20">
              <h2
                className={`text-lg sm:text-xl font-bold mb-4 ${
                  darkMode ? "text-teal-200" : "text-gray-800"
                }`}
              >
                Table of Contents
              </h2>
              <ul className="space-y-2">
                {termsSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`text-sm sm:text-base ${
                        darkMode
                          ? "text-teal-300 hover:text-purple-400"
                          : "text-gray-700 hover:text-purple-400"
                      } transition-colors`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Terms Content */}
          <div className="lg:w-3/4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
              Terms and Conditions
            </h1>
            <div className="w-full max-w-3xl mx-auto">
              <p
                className={`text-base sm:text-lg lg:text-xl mb-6 text-center ${
                  darkMode ? "text-teal-300" : "text-gray-700"
                }`}
              >
                YAMA: Young Athlete Motivation App
                <br />
                Effective Date: July 7th, 2025
              </p>
              <p
                className={`text-base sm:text-lg mb-8 ${
                  darkMode ? "text-teal-300" : "text-gray-700"
                }`}
              >
                Welcome to YAMA: Young Athlete Motivation App ("YAMA", "we", "us",
                or "our"). These Terms and Conditions ("Terms") govern your access
                to and use of the YAMA mobile application and related services (the
                "App"). By using the App, you agree to be bound by these Terms. If
                you do not agree, do not use the App.
              </p>

              {/* Terms Sections */}
              <div className="space-y-4">
                <div id="user-types">
                  <Accordion title="1. User Types" darkMode={darkMode}>
                    <p>
                      There are two types of users on YAMA:
                      <ul className="list-disc pl-6 mt-2">
                        <li>
                          <strong>A. Motivational Contributors</strong>
                          <br />
                          Professional or amateur athletes who create and upload
                          motivational video content.
                        </li>
                        <li>
                          <strong>B. Young Athletes</strong>
                          <br />
                          Youth users who use the app to view motivational videos,
                          track their athletic journey, and engage with personal
                          development tools.
                        </li>
                      </ul>
                    </p>
                  </Accordion>
                </div>

                <div id="eligibility">
                  <Accordion title="2. Eligibility" darkMode={darkMode}>
                    <p>
                      To use YAMA, you must either:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Be at least 13 years of age; or</li>
                        <li>
                          Use the app with the consent and supervision of a parent
                          or legal guardian if under 13.
                        </li>
                      </ul>
                      Motivational Contributors must be at least 18 years old or
                      have reached the age of majority in their country of
                      residence.
                    </p>
                  </Accordion>
                </div>

                <div id="contributor-content">
                  <Accordion
                    title="3. Motivational Contributor Content"
                    darkMode={darkMode}
                  >
                    <p>
                      If you upload video content to YAMA, you agree to the
                      following:
                      <ul className="list-disc pl-6 mt-2">
                        <li>
                          Your video(s) will be made publicly viewable by users of
                          the YAMA app.
                        </li>
                        <li>
                          You grant YAMA a non-exclusive, royalty-free, worldwide
                          license to host, use, reproduce, and distribute your
                          video content within the app for motivational and
                          educational purposes.
                        </li>
                        <li>
                          You may request that your video be removed at any time by
                          contacting our support team at{" "}
                          <a
                            href="mailto:collaborate@maize-lab.com"
                            className="text-purple-400 hover:underline"
                          >
                            collaborate@maize-lab.com
                          </a>
                          . Please allow up to 7 business days for processing.
                        </li>
                        <li>
                          You are solely responsible for the content you upload,
                          and it must not contain illegal, hateful, or
                          inappropriate material.
                        </li>
                      </ul>
                    </p>
                  </Accordion>
                </div>

                <div id="young-athlete">
                  <Accordion title="4. Young Athlete Users" darkMode={darkMode}>
                    <p>
                      As a young athlete using the App:
                      <ul className="list-disc pl-6 mt-2">
                        <li>
                          You will create a profile that includes your name,
                          email, current school grade, city and state, and the
                          sports you play.
                        </li>
                        <li>
                          You may choose to add events to your YAMA calendar and
                          write notes in your personal YAMA journal.
                        </li>
                        <li>
                          All of this information will be kept private, stored
                          securely, and not shared with third parties in any way
                          that could identify you personally.
                        </li>
                        <li>
                          Your information will only be used internally to
                          personalize your experience and show you relevant video
                          content.
                        </li>
                        <li>
                          We may share anonymized, aggregated demographic data
                          (e.g., age range, general location, sport type) with
                          sponsors or advertisers to improve the app and keep it
                          free, but never any personal or identifiable data.
                        </li>
                      </ul>
                    </p>
                  </Accordion>
                </div>

                <div id="account-deletion">
                  <Accordion title="5. Account Deletion" darkMode={darkMode}>
                    <p>
                      You may request to delete your account at any time by:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Accessing the settings section in the app, or</li>
                        <li>
                          Contacting our support team at{" "}
                          <a
                            href="mailto:collaborate@maize-lab.com"
                            className="text-purple-400 hover:underline"
                          >
                            collaborate@maize-lab.com
                          </a>
                          .
                        </li>
                      </ul>
                      Upon deletion, your personal data and content will be
                      removed from our systems in accordance with our data
                      retention policy, except where we are required by law to
                      retain it.
                    </p>
                  </Accordion>
                </div>

                <div id="acceptable-use">
                  <Accordion title="6. Acceptable Use" darkMode={darkMode}>
                    <p>
                      You agree not to:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Use the app for any unlawful or harmful purpose</li>
                        <li>
                          Impersonate another user or misrepresent your affiliation
                        </li>
                        <li>
                          Upload or share content that is offensive,
                          discriminatory, violent, or otherwise inappropriate
                        </li>
                        <li>
                          Attempt to reverse-engineer, copy, or interfere with the
                          App's functionality
                        </li>
                      </ul>
                      We reserve the right to suspend or terminate accounts that
                      violate these rules.
                    </p>
                  </Accordion>
                </div>

                <div id="intellectual-property">
                  <Accordion
                    title="7. Intellectual Property"
                    darkMode={darkMode}
                  >
                    <p>
                      All content on YAMA, excluding user-uploaded videos, is the
                      property of YAMA and its licensors. You may not reproduce,
                      distribute, or create derivative works from the app content
                      without express written permission.
                    </p>
                  </Accordion>
                </div>

                <div id="disclaimer">
                  <Accordion title="8. Disclaimer" darkMode={darkMode}>
                    <p>
                      YAMA provides motivational and personal development content
                      for informational purposes only. We do not guarantee any
                      specific athletic, academic, or personal outcomes. Use of the
                      app is at your own discretion and risk.
                    </p>
                  </Accordion>
                </div>

                <div id="liability">
                  <Accordion
                    title="9. Limitation of Liability"
                    darkMode={darkMode}
                  >
                    <p>
                      To the fullest extent permitted by law:
                      <ul className="list-disc pl-6 mt-2">
                        <li>
                          YAMA shall not be liable for any indirect, incidental, or
                          consequential damages resulting from your use of the App.
                        </li>
                        <li>
                          YAMA's total liability for any claim under these Terms is
                          limited to the amount you paid us (if any) to use the App
                          in the past 12 months.
                        </li>
                      </ul>
                    </p>
                  </Accordion>
                </div>

                <div id="privacy">
                  <Accordion title="10. Privacy" darkMode={darkMode}>
                    <p>
                      Your use of the App is also governed by our{" "}
                      <Link
                        to="/privacy-policy"
                        className="text-purple-400 hover:underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      which outlines how we collect, use, and protect your
                      information. Please read it carefully.
                    </p>
                  </Accordion>
                </div>

                <div id="changes">
                  <Accordion title="11. Changes to Terms" darkMode={darkMode}>
                    <p>
                      We may update these Terms from time to time. We will notify
                      you through the app or via email when we make significant
                      changes. Your continued use of the App after such changes
                      means you accept the new Terms.
                    </p>
                  </Accordion>
                </div>

                <div id="contact">
                  <Accordion title="12. Contact Us" darkMode={darkMode}>
                    <p>
                      For questions, concerns, or support, please contact us at:
                      <br />
                      YAMA Support Team
                      <br />
                      Email:{" "}
                      <a
                        href="mailto:collaborate@maize-lab.com"
                        className="text-purple-400 hover:underline"
                      >
                        collaborate@maize-lab.com
                      </a>
                      <br />
                      Address: 308 ½ S State Street, Suite 20, Ann Arbor, Michigan
                      48104
                    </p>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>

      {/* Consent Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-4 right-4 z-30"
      >
        <button
          onClick={handleConsent}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-all ${
            isConsented
              ? "bg-green-500"
              : "bg-purple-500 hover:bg-purple-600"
          } shadow-lg`}
        >
          {isConsented ? "Accepted!" : "I Accept the Terms"}
        </button>
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
                item === "Terms" ? "text-purple-400" : ""
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

export default Terms;