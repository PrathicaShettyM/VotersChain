import Navbar from '../components/Navbar'; // Import your Navbar
import Footer from '../components/Footer'; // Import your Footer
import heroImage from '../assets/heroImg.jpg'; // Import your image
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className="h-[70vh] flex flex-col">
      <Navbar /> {/* Navbar at the top */}

      <main className="flex-grow flex items-center justify-center"> {/* Main content area */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center h-full"> {/* Container for responsiveness */}
          <div className="md:w-1/2 p-6 text-center md:text-left"> {/* Left side content */}
            <h1 className="text-4xl font-bold mb-4 text-cyan-950">
              Welcome to Voter Chain
            </h1>
            <p className="text-lg text-cyan-900 leading-relaxed mb-8">
              Experience the future of secure and transparent elections with our
              decentralized voting system. Built on blockchain technology, we
              ensure verifiable, tamper-proof, and accessible voting for
              everyone.
            </p>
            <Link to="/aboutus" className="bg-cyan-950 hover:border-2 hover:border-cyan-950 hover:bg-white hover:text-cyan-950 text-white font-bold py-3 px-10 rounded">
              About Us
            </Link>
          </div>
          <div className="md:w-1/2 p-6"> {/* Right side image */}
            <img
              src={heroImage}
              alt="Decentralized Voting Illustration"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </main>

      <Footer /> 
    </div>
  );
}

export default Home;