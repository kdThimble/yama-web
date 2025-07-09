
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface PrivacyPolicyProps {}

interface ExpandableCardProps {
  title: string;
  id: string;
  children: React.ReactNode;
  darkMode: boolean;
}

const ExpandableCard: React.FC<ExpandableCardProps> = ({ title, id, children, darkMode }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <motion.div
      id={id}
      className={`mb-4 rounded-lg overflow-hidden shadow-md ${
        darkMode ? "bg-gray-700" : "bg-white"
      } transition-all duration-300`}
      whileHover={{ scale: 1.02 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div
        className={`p-4 cursor-pointer flex justify-between items-center ${
          darkMode ? "text-teal-200" : "text-gray-800"
        }`}
      >
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
        <span className="text-lg">{isExpanded ? "−" : "+"}</span>
      </div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`p-4 ${darkMode ? "text-teal-300" : "text-gray-700"}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const policySections = [
    { id: "who-applies", title: "1. Who This Policy Applies To" },
    { id: "info-collect", title: "2. Information We Collect" },
    { id: "use-info", title: "3. How We Use Your Information" },
    { id: "public-content", title: "4. Publicly Viewable Content" },
    { id: "young-users", title: "5. Privacy and Safety for Young Users" },
    { id: "data-retention", title: "6. Data Retention" },
    { id: "rights-choices", title: "7. Your Rights and Choices" },
    { id: "data-security", title: "8. Data Security" },
    { id: "third-party", title: "9. Third-Party Services" },
    { id: "international", title: "10. International Users" },
    { id: "policy-changes", title: "11. Changes to This Policy" },
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

      {/* Privacy Policy Section */}
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
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-4 pb-4 lg:pb-0">
                {policySections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`text-sm sm:text-base whitespace-nowrap ${
                      darkMode
                        ? "text-teal-300 hover:text-purple-400"
                        : "text-gray-700 hover:text-purple-400"
                    } transition-colors`}
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Policy Content */}
          <div className="lg:w-3/4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-teal-400">
              Privacy Policy
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
                At YAMA, your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and share your information when you use the YAMA: Young Athlete Motivation App ("YAMA", "we", "us", or "our"). By using the app, you agree to the terms of this Privacy Policy.
              </p>

              {/* Policy Sections */}
              <div className="space-y-4">
                <ExpandableCard id="who-applies" title="1. Who This Policy Applies To" darkMode={darkMode}>
                  <p>
                    YAMA is designed for two types of users:
                    <ul className="list-disc pl-6 mt-2">
                      <li>
                        <strong>Motivational Contributors:</strong> Adult athletes (amateur or professional) who upload motivational videos for youth.
                      </li>
                      <li>
                        <strong>Young Athletes:</strong> Youth users who create a profile, watch videos, and track their goals and progress.
                      </li>
                    </ul>
                    We are especially committed to protecting the privacy of children and teens who use our app.
                  </p>
                </ExpandableCard>

                <ExpandableCard id="info-collect" title="2. Information We Collect" darkMode={darkMode}>
                  <div>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-2 ${darkMode ? "text-teal-200" : "text-gray-800"}`}>
                      A. Information from Young Athletes
                    </h3>
                    <p>
                      When you register or use the App, we may collect:
                      <ul className="list-disc pl-6 mt-2">
                        <li><strong>Personal Information:</strong> Name, Email address, School grade, City and state, Sports you play</li>
                        <li><strong>Optional Inputs:</strong> Calendar events (e.g., practices, games, tournaments), Notes in the YAMA Journal</li>
                      </ul>
                    </p>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-2 mt-4 ${darkMode ? "text-teal-200" : "text-gray-800"}`}>
                      B. Information from Motivational Contributors
                    </h3>
                    <p>
                      If you submit content, we collect:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Name and profile information</li>
                        <li>Video(s) you upload and related metadata</li>
                        <li>Email address (for contact and support)</li>
                      </ul>
                    </p>
                    <h3 className={`text-lg sm:text-xl font-semibold mb-2 mt-4 ${darkMode ? "text-teal-200" : "text-gray-800"}`}>
                      C. Automatically Collected Information
                    </h3>
                    <p>
                      For all users, we may collect:
                      <ul className="list-disc pl-6 mt-2">
                        <li>Device type, operating system, and app version</li>
                        <li>IP address (used only for general location and security)</li>
                        <li>Usage data (e.g., what videos are watched, app features used)</li>
                      </ul>
                    </p>
                  </div>
                </ExpandableCard>

                <ExpandableCard id="use-info" title="3. How We Use Your Information" darkMode={darkMode}>
                  <p>
                    We use your information to:
                    <ul className="list-disc pl-6 mt-2">
                      <li>Provide and personalize your YAMA experience</li>
                      <li>Show video content tailored to your sports and goals</li>
                      <li>Improve app features, content, and user experience</li>
                      <li>Provide customer support</li>
                      <li>Ensure safety and compliance with laws</li>
                      <li>
                        Share anonymous, aggregated demographic data with sponsors (e.g., "60% of users are in middle school and play basketball")
                      </li>
                    </ul>
                    We never share personal or identifiable information with advertisers or sponsors.
                  </p>
                </ExpandableCard>

                <ExpandableCard id="public-content" title="4. Publicly Viewable Content" darkMode={darkMode}>
                  <p>
                    Videos uploaded by Motivational Contributors are visible to all users of the app. By submitting a video, you consent to having it published on the app. You may request removal of your video at any time by contacting us at{" "}
                    <a href="mailto:collaborate@maize-lab.com" className="text-purple-400 hover:underline">
                      collaborate@maize-lab.com
                    </a>.
                  </p>
                </ExpandableCard>

                <ExpandableCard id="young-users" title="5. Privacy and Safety for Young Users" darkMode={darkMode}>
                  <p>
                    <ul className="list-disc pl-6 mt-2">
                      <li>YAMA does not display personal profiles publicly.</li>
                      <li>Journals, calendars, and user info are kept private.</li>
                      <li>We do not sell or rent user data.</li>
                      <li>The app is designed to comply with the Children’s Online Privacy Protection Act (COPPA) and similar global privacy regulations.</li>
                      <li>If a user is under 13, parental or guardian consent may be required to create an account.</li>
                    </ul>
                  </p>
                </ExpandableCard>

                <ExpandableCard id="data-retention" title="6. Data Retention" darkMode={darkMode}>
                  <p>
                    We keep your data only as long as necessary to provide services or meet legal requirements. If you delete your account, we will delete your personal data unless retention is required by law.
                  </p>
                </ExpandableCard>

                <ExpandableCard id="rights-choices" title="7. Your Rights and Choices" darkMode={darkMode}>
                  <p>
                    Depending on where you live, you may have rights to:
                    <ul className="list-disc pl-6 mt-2">
                      <li>Access or correct your personal information</li>
                      <li>Delete your data and account</li>
                      <li>Opt out of certain communications or data uses</li>
                      <li>Request a copy of your data</li>
                    </ul>
                    To exercise any of these rights, please email us at{" "}
                    <a href="mailto:collaborate@maize-lab.com" className="text-purple-400 hover:underline">
                      collaborate@maize-lab.com
                    </a>.
                  </p>
                </ExpandableCard>

                <ExpandableCard id="data-security" title="8. Data Security" darkMode={darkMode}>
                  <p>
                    We take reasonable steps to protect your information from unauthorized access, use, or disclosure. These include:
                    <ul className="list-disc pl-6 mt-2">
                      <li>Encrypted data storage</li>
                      <li>Secure user authentication</li>
                      <li>Regular audits and system updates</li>
                    </ul>
                    However, no system is completely secure. Please protect your login information and notify us of any suspicious activity.
                  </p>
                </ExpandableCard>

                <ExpandableCard id="third-party" title="9. Third-Party Services" darkMode={darkMode}>
                  <p>
                    We may use trusted third-party service providers (e.g., cloud storage, analytics). These providers are contractually bound to protect your data and use it only as directed by YAMA. We do not allow third-party advertising platforms to collect personal data from users.
                  </p>
                </ExpandableCard>

                <ExpandableCard id="international" title="10. International Users" darkMode={darkMode}>
                  <p>
                    YAMA is based in the United States. If you use the app from outside this region, you consent to the transfer of your information to our servers located in that country, which may have different privacy protections.
                  </p>
                </ExpandableCard>

                <ExpandableCard id="policy-changes" title="11. Changes to This Policy" darkMode={darkMode}>
                  <p>
                    We may update this Privacy Policy periodically. When we do, we will notify users through the app or by email. Continued use of the app after changes means you accept the updated policy.
                  </p>
                </ExpandableCard>

                <ExpandableCard id="contact" title="12. Contact Us" darkMode={darkMode}>
                  <p>
                    If you have any questions about this Privacy Policy or how your information is handled, please contact us:
                    <br />
                    YAMA Support Team
                    <br />
                    Email:{" "}
                    <a href="mailto:collaborate@maize-lab.com" className="text-purple-400 hover:underline">
                      collaborate@maize-lab.com
                    </a>
                    <br />
                    Address: 308 ½ S State Street, Suite 20, Ann Arbor, Michigan 48104
                  </p>
                </ExpandableCard>
              </div>
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
                item === "Privacy" ? "/privacy-policy" : item === "Terms" ? "/terms" : "/about"
              }
              className={`text-sm sm:text-base font-medium ${
                item === "Privacy" ? "text-purple-400" : ""
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

export default PrivacyPolicy;