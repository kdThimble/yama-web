import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Progress from "./Progress";
import Button from "./Button";
import { motion } from "framer-motion";

interface FileUploaderProps {
  isDark: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ isDark = false }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [contactNumber, setContactNumber] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const API_URL: string =
    "https://dev.yama.maizelab-cloud.com/api/v1/uploads/uploadRawVideo";

  // Request camera permission for mobile devices
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.warn("Camera permission denied or not available:", error);
      }
    };

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      requestCameraPermission();
    }
  }, []);

  // Auto-hide alert after 3 seconds
  useEffect(() => {
    if (uploadStatus) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
        if (uploadStatus.includes("successfully")) {
          setSelectedFile(null);
          setUploadStatus("");
          setContactNumber("");
          setEmailId("");
          setVideoPreviewUrl(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input
          }
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [uploadStatus]);

  // Clean up video preview URL
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus("");
      setUploadProgress(0);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(previewUrl);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadToApi = async (): Promise<void> => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first");
      return;
    }

    setUploading(true);
    setUploadStatus("Uploading...");

    try {
      const formData = new FormData();
      formData.append("rawVideo", selectedFile);

      const data: { contactNumber?: string; emailId?: string } = {};
      if (contactNumber) data.contactNumber = contactNumber;
      if (emailId) data.emailId = emailId;
      if (Object.keys(data).length > 0) {
        formData.append("data", JSON.stringify(data));
      }

      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setUploadProgress(Math.round(percentComplete));
        }
      });

      xhr.open("POST", API_URL, true);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 201) {
            setUploadStatus("File uploaded successfully!");
          } else {
            setUploadStatus("Error uploading file. Please try again.");
          }
          setUploading(false);
        }
      };

      xhr.onerror = () => {
        setUploadStatus("Error uploading file. Please try again.");
        setUploading(false);
      };

      xhr.send(formData);
    } catch (error) {
      setUploadStatus("Error uploading file. Please try again.");
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`max-w-lg mx-auto p-8 space-y-6 rounded-2xl shadow-xl ${
        isDark
          ? "bg-gradient-to-br from-gray-800 to-purple-900"
          : "bg-gradient-to-br from-purple-100 to-teal-100"
      }`}
    >
      {/* Alert for success/error */}
      {showAlert && uploadStatus && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white text-base font-semibold shadow-lg z-50
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

      <div className="space-y-6">
        {/* File Selector Button */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            onClick={handleButtonClick}
            className={`w-full max-w-xs bg-gradient-to-r ${
              isDark
                ? "from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600"
                : "from-purple-400 to-teal-400 hover:from-purple-500 hover:to-teal-500"
            } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105`}
            disabled={uploading}
          >
            {selectedFile ? "Change Video" : "Select Video"}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            disabled={uploading}
            accept="video/*"
            capture="environment"
          />
        </div>

        {/* Video Preview */}
        {selectedFile && videoPreviewUrl && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <div
              className={`text-sm text-center font-medium ${
                isDark ? "text-teal-200" : "text-gray-700"
              }`}
            >
              Selected: {selectedFile.name}
            </div>
            <div className="flex justify-center">
              <video
                src={videoPreviewUrl}
                controls
                className="w-full max-w-md h-auto rounded-lg shadow-md border-2 border-purple-400/30"
                style={{ maxHeight: "300px" }}
              />
            </div>
          </motion.div>
        )}

        {/* Contact and Email Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Contact Number (optional)"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 ${
              isDark
                ? "border-gray-600 bg-gray-700 text-teal-200"
                : "border-gray-300 bg-white text-gray-900"
            }`}
            disabled={uploading}
          />
          <input
            type="email"
            placeholder="Email (optional)"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200 ${
              isDark
                ? "border-gray-600 bg-gray-700 text-teal-200"
                : "border-gray-300 bg-white text-gray-900"
            }`}
            disabled={uploading}
          />
        </div>

        {/* Upload Button and Progress */}
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Button
              onClick={uploadToApi}
              disabled={uploading}
              variant="primary"
              className={`w-full bg-gradient-to-r ${
                isDark
                  ? "from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600"
                  : "from-purple-400 to-teal-400 hover:from-purple-500 hover:to-teal-500"
              } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105`}
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </Button>
            {uploading && (
              <Progress
                value={uploadProgress}
                className={`w-full h-2 rounded-full ${
                  isDark ? "bg-gray-700" : "bg-gray-200"
                }`}
              />
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FileUploader;
