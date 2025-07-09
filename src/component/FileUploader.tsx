import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import Progress from "./Progress";
import Button from "./Button";
import { motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import confetti from "canvas-confetti";

interface FileUploaderProps {
  isDark: boolean;
  onUploadStatusChange: (status: string) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  isDark = false,
  onUploadStatusChange,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [contactNumber, setContactNumber] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [useCamera, setUseCamera] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const API_BASE_URL: string = "https://dev.yama.maizelab-cloud.com";
  const PART_SIZE = 80 * 1024 * 1024; // 80MB per part

  // Detect mobile device
  useEffect(() => {
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    setIsMobile(mobile);
  }, []);

  // Request camera permission for mobile devices when using camera
  useEffect(() => {
    const requestCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        console.warn("Camera permission denied or not available:", error);
        onUploadStatusChange(
          "Camera access denied. Please select a file instead."
        );
      }
    };

    if (isMobile && useCamera) {
      requestCameraPermission();
    }
  }, [isMobile, useCamera, onUploadStatusChange]);

  // Clean up video preview URL
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  // Attempt to load video metadata for thumbnail
  useEffect(() => {
    if (videoRef.current && videoPreviewUrl) {
      videoRef.current.load();
      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current!.currentTime = 1; // Seek to 1 second for thumbnail
      });
    }
  }, [videoPreviewUrl]);

  const getFileType = (file: File): string => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    return ["mov", "m4v"].includes(extension || "")
      ? "video/quicktime"
      : "video/mp4";
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onUploadStatusChange("");
      setUploadProgress(0);
      const previewUrl = URL.createObjectURL(file);
      setVideoPreviewUrl(previewUrl);
    }
  };

  const handleButtonClick = (useCameraInput: boolean) => {
    setUseCamera(useCameraInput);
    const inputRef = useCameraInput ? cameraInputRef : fileInputRef;
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Split file into parts
  const splitFileIntoParts = (file: File): Blob[] => {
    const parts: Blob[] = [];
    const partCount = Math.ceil(file.size / PART_SIZE);
    for (let i = 0; i < partCount; i++) {
      const start = i * PART_SIZE;
      const end = Math.min(start + PART_SIZE, file.size);
      parts.push(file.slice(start, end));
    }
    return parts;
  };

  // Get presigned URLs from backend
  const getPresignedUrls = async (
    partCount: number,
    fileName: string,
    fileType: string
  ) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/uploads/rawVideoSignedUrl`,
        {
          fileName,
          fileType,
          partCount,
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error fetching presigned URLs:",
          error.message,
          error.response?.data
        );
        throw new Error(`Failed to get presigned URLs: ${error.message}`);
      } else {
        console.error("Unknown error fetching presigned URLs:", error);
        throw new Error("Failed to get presigned URLs: Unknown error");
      }
    }
  };

  // Upload parts and track progress
  const uploadParts = async (
    parts: Blob[],
    uploadUrls: { partNumber: number; signedUrl: string }[],
    fileType: string
  ) => {
    const etags: { PartNumber: number; ETag: string }[] = [];
    let totalLoaded = 0;
    const totalSize = parts.reduce((sum, part) => sum + part.size, 0);

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const { partNumber, signedUrl } = uploadUrls[i];

      try {
        const response = await axios.put(signedUrl, part, {
          headers: {
            "Content-Type": fileType,
            "Content-Length": part.size.toString(),
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const partLoaded = progressEvent.loaded;
              const progress = ((totalLoaded + partLoaded) / totalSize) * 100;
              setUploadProgress(Math.min(Math.round(progress), 100));
            }
          },
        });

        totalLoaded += part.size;
        setUploadProgress(
          Math.min(Math.round((totalLoaded / totalSize) * 100), 100)
        );

        etags.push({
          PartNumber: partNumber,
          ETag: response.headers.etag || "",
        });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            `Error uploading part ${partNumber}:`,
            error.message,
            error.response?.data
          );
          throw new Error(
            `Failed to upload part ${partNumber}: ${error.message}`
          );
        } else {
          console.error(`Unknown error uploading part ${partNumber}:`, error);
          throw new Error(`Failed to upload part ${partNumber}: Unknown error`);
        }
      }
    }

    return etags;
  };

  // Complete upload
  const completeUpload = async (payload: {
    uploadId: string;
    fileName: string;
    parts: { PartNumber: number; ETag: string }[];
    emailId?: string;
    contactNumber?: string;
  }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/v1/uploads/rawVideo`,
        payload
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error completing upload:",
          error.message,
          error.response?.data
        );
        throw new Error(`Failed to complete upload: ${error.message}`);
      } else {
        console.error("Unknown error completing upload:", error);
        throw new Error("Failed to complete upload: Unknown error");
      }
    }
  };

  // Main upload function
  const uploadToApi = async (): Promise<void> => {
    if (!selectedFile) {
      onUploadStatusChange("Please select a file first");
      return;
    }

    setUploading(true);
    onUploadStatusChange("Uploading video...");
    setUploadProgress(0);

    try {
      // Get file type
      const fileType = getFileType(selectedFile);

      // Split file into parts
      const parts = splitFileIntoParts(selectedFile);
      if (parts.length === 0) {
        onUploadStatusChange("No data to upload");
        setUploading(false);
        return;
      }

      // Get presigned URLs
      const { key, uploadId, uploadUrls } = await getPresignedUrls(
        parts.length,
        selectedFile.name,
        fileType
      );

      // Upload parts
      const uploadedParts = await uploadParts(parts, uploadUrls, fileType);

      // Complete upload
      const payload = {
        uploadId,
        fileName: key,
        parts: uploadedParts,
        emailId: emailId || undefined,
        contactNumber: contactNumber || undefined,
      };

      await completeUpload(payload);
      onUploadStatusChange("Video uploaded successfully!");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#9333ea", "#14b8a6", "#ffffff"],
      });

      // Reset form after successful upload
      setTimeout(() => {
        setSelectedFile(null);
        setContactNumber("");
        setEmailId("");
        setVideoPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (cameraInputRef.current) cameraInputRef.current.value = "";
      }, 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      onUploadStatusChange(
        `Failed to upload video: ${errorMessage}. Please try again.`
      );
      console.error("Upload error:", error);
    } finally {
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
      <div className="space-y-6">
        {/* File Selector Buttons */}
        <div
          className={`flex ${
            isMobile ? "flex-col space-y-4" : "justify-center space-x-4"
          }`}
        >
          {isMobile ? (
            <>
              <Button
                variant="primary"
                onClick={() => handleButtonClick(true)}
                className={`w-full bg-gradient-to-r ${
                  isDark
                    ? "from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600"
                    : "from-purple-400 to-teal-400 hover:from-purple-500 hover:to-teal-500"
                } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105`}
                disabled={uploading}
              >
                {selectedFile && useCamera ? "Re-record Video" : "Record Video"}
              </Button>
              <Button
                variant="primary"
                onClick={() => handleButtonClick(false)}
                className={`w-full bg-gradient-to-r ${
                  isDark
                    ? "from-purple-500 to-teal-500 hover:from-purple--600 hover:to-teal-600"
                    : "from-purple-400 to-teal-400 hover:from-purple-500 hover:to-teal-500"
                } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105`}
                disabled={uploading}
              >
                {selectedFile && !useCamera ? "Change Video" : "Select Video"}
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              onClick={() => handleButtonClick(false)}
              className={`w-full max-w-xs bg-gradient-to-r ${
                isDark
                  ? "from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600"
                  : "from-purple-400 to-teal-400 hover:from-purple-500 hover:to-teal-500"
              } text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105`}
              disabled={uploading}
            >
              {selectedFile ? "Change Video" : "Select Video"}
            </Button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            disabled={uploading}
            accept="video/mp4,video/quicktime,video/m4v"
          />
          {isMobile && (
            <input
              ref={cameraInputRef}
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              disabled={uploading}
              accept="video/mp4,video/quicktime,video/m4v"
              capture="environment"
            />
          )}
        </div>

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
                ref={videoRef}
                src={videoPreviewUrl}
                controls
                playsInline
                poster={videoPreviewUrl}
                className="w-full max-w-md h-auto rounded-lg shadow-md border-2 border-purple-400/30"
                style={{ maxHeight: "300px" }}
              >
                <source
                  src={videoPreviewUrl}
                  type={getFileType(selectedFile)}
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default FileUploader;
