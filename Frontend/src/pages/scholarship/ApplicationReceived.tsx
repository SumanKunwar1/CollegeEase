import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

const ApplicationReceived: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-600">Thank You!</h1>
        <p className="mt-4 text-gray-700">
          We have successfully received your application. The scholarship
          provider team will thoroughly review your application and get back to
          you.
        </p>
        <p className="mt-2 text-gray-500">We appreciate your patience.</p>
        <Button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default ApplicationReceived;
