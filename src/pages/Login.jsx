import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { FaUtensils } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthProvider';
import PlateShareLogo from './shared/PlateShareLogo ';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { googleLogin, emailLogin, loading, user } = useContext(AuthContext);

  // ✅ Prevent logged-in users from staying on /login
  if (user) {
    return <Navigate to={location.state?.from?.pathname || "/"} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await emailLogin(email, password);
      navigate(location.state?.from?.pathname || "/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      navigate(location.state?.from?.pathname || "/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Left Section */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-3xl font-bold flex items-center justify-center lg:justify-start gap-2">
            <FaUtensils className="text-green-600" />
            Login to <PlateShareLogo />
          </h1>
          <p className="py-6 text-lg">
            Welcome to <span className="font-semibold">PlateShare</span> – the platform where restaurants donate surplus food, charities receive meals,
            and communities come together to fight hunger and reduce food waste.
          </p>
          <ul className="space-y-2 text-left">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Access surplus food donations from restaurants
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Request meals for your charity with ease
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Help reduce food waste and fight hunger
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Build stronger community connections
            </li>
          </ul>
        </div>

        {/* Login Card */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            {error && (
              <div className="alert alert-error">
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-success ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Login'}
                </button>
              </div>
            </form>
            <div className="divider">OR</div>
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline gap-2"
              disabled={loading}
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>
            <div className="text-center mt-4">
              <span className="text-sm">New to PlateShare? </span>
              <Link to="/register" className="link link-success text-sm">
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
