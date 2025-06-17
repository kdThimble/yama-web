import React from "react";
import { motion } from "framer-motion";
import Accordion from "../component/Accordion";

const App = () => {
  return (
    <div className="min-h-screen w-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full space-y-8">
        {/* What We Need Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 relative"
        >
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
            What We Need
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">
            A 1 to 2 minute YAMA Video of You Motivating Young Athletes
          </p>
        </motion.div>

        {/* What We Need Detailed Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/200x60?text=YAMA+Logo"
              alt="YAMA Logo"
              className="h-12 lg:h-16"
            />
          </div>
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
            What We Need
          </h3>
          <p className="text-lg lg:text-xl text-gray-600 mb-4">
            A 90 Second YAMA Video of You Motivating Young Athletes
          </p>

          <Accordion title="Who it’s For">
            12-20 year olds who need guidance and motivation but can’t afford it
            all
          </Accordion>

          <Accordion title="What Topic Should You Talk About?">
            Physical Fitness, Mental Fitness, or Life Skills
          </Accordion>

          <Accordion title="Tips for a good video">
            Good lighting, eye level, and camera a few feet away from you
          </Accordion>

          <Accordion title="Do I Get Paid for Doing This?">
            Most volunteer it for free, but you can earn Stock in the YAMA app
            by asking here:
          </Accordion>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition text-lg lg:text-xl mt-4"
          >
            Record a Video on Your Phone and Upload It
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition text-lg lg:text-xl mt-3"
          >
            Upload Your Video
          </motion.button>

          <div className="mt-6">
            <h4 className="text-lg lg:text-xl font-medium text-gray-800">
              YAMA Videos from Other Athletes
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://via.placeholder.com/120?text=Video+1"
                alt="Video 1"
                className="rounded-lg w-full h-24 lg:h-32 object-cover"
              />
              <motion.img
                whileHover={{ scale: 1.05 }}
                src="https://via.placeholder.com/120?text=Video+2"
                alt="Video 2"
                className="rounded-lg w-full h-24 lg:h-32 object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Thank You Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="flex justify-center mb-6">
            <img
              src="https://via.placeholder.com/200x60?text=YAMA+Logo"
              alt="YAMA Logo"
              className="h-12 lg:h-16"
            />
          </div>
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4">
            Thank You
          </h3>
          <p className="text-lg lg:text-xl text-gray-600 mb-6">
            Your Video is Uploaded
          </p>

          <div className="flex justify-center mb-6">
            <motion.img
              whileHover={{ scale: 1.05 }}
              src="https://via.placeholder.com/200?text=Uploaded+Video"
              alt="Uploaded Video"
              className="rounded-lg w-48 h-32 lg:w-64 lg:h-40 object-cover"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-1/2 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition text-lg lg:text-xl"
            >
              View Video
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-1/2 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition text-lg lg:text-xl"
            >
              Delete Video
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition text-lg lg:text-xl mb-6"
          >
            Upload New Video
          </motion.button>

          <h4 className="text-lg lg:text-xl font-medium text-gray-800 mb-3">
            Enter Your Email or Phone Number to receive a copy of your finalized
            video:
          </h4>
          <input
            type="text"
            placeholder=""
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-900 text-lg lg:text-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default App;
