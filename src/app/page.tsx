"use client"
import PlayerAnimation from "./mycomponents/player"
import Home1 from "./mycomponents/home/home1"
import { TypeAnimation } from 'react-type-animation';
import Link from "next/link";
import Askdoubt from "./mycomponents/askFormdoubts";
import { useEffect } from "react";

export default function Home() {
  // Add scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-96 h-96 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-96 h-96 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Hero Section */}
      <main className="container max-w-screen-xl px-4 pt-28 pb-16 mx-auto min-h-screen flex flex-col justify-center relative z-10">
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 animate-on-scroll">
          {/* Left: Text Content */}
          <div className="w-full lg:w-3/5 flex flex-col gap-8">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
                Connect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">"Senior"</span>
              </h1>
              <div className="h-1.5 w-40 bg-gradient-to-r from-blue-600 to-purple-600 mt-4 rounded-full"></div>
              
              <h2 className="mt-4 text-xl md:text-2xl lg:text-3xl font-semibold text-gray-600 dark:text-gray-300 tracking-wider">
                "Senior Wisdom Junior Queries"
              </h2>
              
              <div className="mt-8 h-16 flex items-center">
                <TypeAnimation
                  sequence={[
                    'Senior Squad: Youth Connect',
                    1500,
                    'WisdomWave: Bridge Generations',
                    1500,
                    'WisdomWave: Bridge Generations',
                    1500,
                    'Senior Squad: Youth Connect',
                    1500,
                  ]}
                  wrapper="h3"
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500"
                  cursor={true}
                  repeat={Infinity}
                />
              </div>
            </div>
            
            <div className="mt-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-md group-hover:blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <Link href="/sign-up"
                className="relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
                role="button">
                <span className="mr-2">Join now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Right: Animation */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative group transform perspective-1000 hover:rotate-y-12 transition-all duration-700 w-full max-w-md">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 blur-md group-hover:blur transition duration-500"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform perspective-1000 group-hover:scale-105 transition-all duration-500">
                <div className="p-6">
                  <PlayerAnimation link={"https://lottie.host/73dcbf20-9926-42b2-99d3-5e9319b62b42/Ewce5CCmYN.json"} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Ask Doubt Section */}
      <main className="container max-w-screen-xl px-4 py-16 mx-auto relative z-10">
        <section className="flex flex-col-reverse lg:flex-row items-center gap-12 animate-on-scroll">
          {/* Animation Left */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative group transform perspective-1000 hover:rotate-y-12 transition-all duration-700 w-full max-w-md">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 opacity-70 group-hover:opacity-100 blur-md group-hover:blur transition duration-500"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl transform perspective-1000 group-hover:scale-105 transition-all duration-500">
                <div className="p-6">
                  <PlayerAnimation link={"https://lottie.host/33576295-4801-452e-af4c-b4b2aac99137/jrfPwqnsVy.json"} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Ask Doubt Form Right */}
          <div className="w-full lg:w-3/5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-8">
                <div className="flex flex-col items-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">Have a doubt?</h2>
                  <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                  <p className="mt-4 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Ask your question and get answers from seniors
                  </p>
                </div>
                <Askdoubt />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Features Section */}
      <main className="container max-w-screen-xl px-4 py-16 mx-auto relative z-10">
        <div className="mb-16 text-center animate-on-scroll">
          <h2 className="text-4xl font-bold mb-4">Why Connect Senior?</h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">Bridge the generation gap with knowledge sharing</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureCards.map((card, index) => (
            <div key={index} className="relative group animate-on-scroll" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-blue-600 rounded-xl opacity-50 group-hover:opacity-100 blur-sm group-hover:blur-md transition duration-300"></div>
              <div className="relative p-6 bg-white dark:bg-gray-900 rounded-xl flex flex-col items-center text-center h-full transform group-hover:-translate-y-2 transition-all duration-300">
                <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

// Feature cards data
const featureCards = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.776-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Wisdom Exchange",
    description: "Learn from the experiences of seniors who have walked the path before you."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Direct Answers",
    description: "Get personalized answers to your specific questions and concerns."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Community Building",
    description: "Be part of a supportive intergenerational community that grows together."
  },
];
