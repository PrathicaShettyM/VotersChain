import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AboutUs = () => {
  const teamMembers = [
    { name: "Prathica Shetty M", usn: "1RV22CY046", role: "Backend Developer" },
    { name: "Santhosh Kumar L", usn: "1RV22CY050", role: "Frontend Developer" },
    { name: "Sarthak Gupta", usn: "1RV22CY051", role: "Blockchain Engineer" },
  ];

  const techStacks = [
    "React",
    "TailwindCSS",
    "Express",
    "Node.js",
    "MongoDB",
    "Hardhat",
    "Blockchain",
  ];

  return (
    <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6 pt-16">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
    <p className="text-center text-gray-600 max-w-2xl mb-10">
      Welcome to our project! We are a passionate team of developers dedicated
      to building innovative solutions using modern technologies. Our goal is
      to make an impact in the world of blockchain and web development.
    </p>

    <div className="w-full">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Team Members
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
            <p className="text-gray-600">USN: {member.usn}</p>
            <p className="text-gray-600">Role: {member.role}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-16">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Tech Stacks
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {techStacks.map((tech, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-blue-100 text-blue-800 font-medium rounded-lg shadow-sm hover:shadow-md transition"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AboutUs;
