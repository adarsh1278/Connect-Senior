"use client"
import React from "react";
import { Mail, Linkedin, Github } from "lucide-react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-8">
          ConnectSenior helps junior students connect with seniors from the same college. It provides a platform for sharing experiences and seeking guidance. To contribute to our project, check out our Github repository.
        </p>
        <h2 className="text-xl font-bold mb-4">Team Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-2xl  p-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md p-7"
            >
              <h3 className="text-lg font-semibold mb-2 ">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{member.role}</p>
              <div className="flex items-center space-x-2">
                <a
                  href={member.Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-400 transition"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href={`mailto:${member.email}`}
                  className="hover:text-gray-400 transition"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-4 pb-8">
        <div>
          <h2 className=" text-3xl font-bold mb-6">Github Repository</h2>
          <p className="mb-4 text-2xl">
            To contribute to our project, visit our Github repository:
          </p>
          <a
            href="https://Github.com/your-Github-repo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            View Repository
          </a>
        </div>
        <div className="mt-8">
          <p className="text-lg font-bold">Made by Team Vedans</p>
          <p className="text-lg">Connect with your seniors for support</p>
          <p className="text-lg">Use demo accounts <strong className="text-blue-500">demo.2327cs1021@kiet.edu</strong> and <strong className="text-blue-500">demo.2327cse1022@kiet.edu</strong> with password <strong>123456</strong> to explore the application.</p>
          
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Adarsh Tiwari",
    role: "Frontend Developer",
    Github: "https://Github.com/adarsh-tiwari",
    linkedin: "https://www.linkedin.com/in/adarsh-tiwari/",
    email: "adarsh@example.com",
  },
  {
    name: "Prassanam Tiwari",
    role: "Backend Developer",
    Github: "https://Github.com/prassanam-tiwari",
    linkedin: "https://www.linkedin.com/in/prassanam-tiwari/",
    email: "prassanam@example.com",
  },
  {
    name: "Aditi Gupta",
    role: "UI/UX Designer",
    Github: "https://Github.com/aditi-gupta",
    linkedin: "https://www.linkedin.com/in/aditi-gupta/",
    email: "aditi@example.com",
  },
  {
    name: "Aditya Maheshwari",
    role: "Database Administrator",
    Github: "https://Github.com/aditya-maheshwari",
    linkedin: "https://www.linkedin.com/in/aditya-maheshwari/",
    email: "aditya@example.com",
  },
  {
    name: "Anmol Singh",
    role: "Quality Assurance",
    Github: "https://Github.com/anmol-singh",
    linkedin: "https://www.linkedin.com/in/anmol-singh/",
    email: "anmol@example.com",
  },
];

export default AboutUsPage;
