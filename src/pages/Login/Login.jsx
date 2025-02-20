import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
// import app from "../firebaseConfig"; // Ensure you have Firebase configured

const Login = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(""); // State for error messages
  const from = location.state?.from?.pathname || "/";
  //   const auth = getAuth(app);
  //   const provider = new GoogleAuthProvider();

  // Redirect if already logged in
  //   useEffect(() => {
  //     onAuthStateChanged(auth, (user) => {
  //       if (user) {
  //         navigate("/");
  //       }
  //     });
  //   }, [auth, navigate]);

  const handleGoogleSignIn = async () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
      };
      navigate("/");
      //   axiosPublic.post("/users", userInfo).then((res) => {
      //     console.log(res.data);
      //     navigate("/");
      //   });
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h1 className="text-3xl font-semibold mb-4">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Sign in to continue</p>

        <button
          onClick={handleGoogleSignIn}
          className="btn btn-outline w-full flex items-center gap-2"
        >
          <FaGoogle className="mr-2"></FaGoogle>
          {/* <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Google_2015_logo.svg"
            alt="Google Logo"
            className="w-5 h-5"
          /> */}
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
