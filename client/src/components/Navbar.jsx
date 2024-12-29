import { useState } from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-cyan-950 p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="text-white font-bold text-xl">VotersChain</div>

        {/* hamburger icon */}
        <div className="md:hidden"> {/* Hide tabs on breakpoints */}
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`w-full md:w-auto md:flex md:items-center ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col md:flex-row md:space-x-4 text-white w-full"> {/* Added w-full to the inner div */}
            <Link to="/" className="block py-2 md:inline-block hover:text-gray-300">
              Home
            </Link>
            <Link to="/aboutus" className="block py-2 md:inline-block hover:text-gray-300">
              AboutUs
            </Link>
            <Link to="/results/12345" className="block py-2 md:inline-block hover:text-gray-300">
              Results
            </Link>
            <Link to="/login" className="block py-2 md:inline-block hover:text-gray-300">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;