import { Link } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-6">
      <h1 className="text-9xl font-bold text-gray-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-gray-400 mt-2 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all"
      >
        <ArrowLeftCircle className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
