"use client"
import PlayerAnimation from "./mycomponents/player"
import Home1 from "./mycomponents/home/home1"
import { TypeAnimation } from 'react-type-animation';
import Link from "next/link";
export  default function home(){
  return(
   <>
      
 <main className="container max-w-screen-xl  px-3 py-10  mx-auto  ">
        <main className="items-center lg:flex">
            <main className="w-full lg:w-2/3">
                <main className="lg:max-w-lg ">
                <h1 className="text-3xl font-semibold text-gray-800 lg:text-6xl dark:text-white">Connect <span className="text-blue-700">&quot;Senior&quot;</span></h1>
<h2 className="mt-3 text-1xl font-semibold text-gray-400 dark:text-gray-100 lg:text-4xl">&quot;Senior Wisdom Junior Queries&quot;</h2>

                    <h2 className="mt-3 text-1xl font-semibold text-blue-900 lg:text-4xl  mb-8">
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
                            wrapper="span"
                            cursor={true}
                            repeat={Infinity}
                            
                            />
                            <span className='opacity-0'>|</span>

                            </h2>
                    
                   {/* <Link href={"/sign-up"} className=" animate-bounce inline-block  w-full  mt-9 px-5  text-center  h-fit py-3 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    Join now</Link> */}
                    <div className="relative inline-flex  group">
        <div
            className=" absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
        </div>
        <Link href="/sign-up" title="Get quote now"
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold  dark:text-white transition-all duration-200 bg-slate-100 dark:bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button">Join now
        </Link>
    </div>
                    {/* <div className="animate-spin w-full px-5 py-2 mt-6   text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Join now</div> */}
                </main>
            </main>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <PlayerAnimation link={"https://lottie.host/73dcbf20-9926-42b2-99d3-5e9319b62b42/Ewce5CCmYN.json"}/>
           </div>
        </main>
    </main>
    <main className=" container max-w-screen-xl  px-3 py-10  mx-auto  ">
        <main className="items-center  flex flex-col-reverse lg:flex-row  ">

                
                <div className="flex  justify-start w-full mt-6 lg:mt-0 lg:w-1/2  ">
           <div className=" flex justify-start mb-11 "> <PlayerAnimation  link={"https://lottie.host/33576295-4801-452e-af4c-b4b2aac99137/jrfPwqnsVy.json "}/></div>
           </div>
                    
                    {/* <div className="w-full px-5 py-2 mt-6  text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500" onClick={() => router.push('/uiux')}>JOIN UI UX BOOTCAMP</div> */}
            
            

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-full">
            <div className=" sm:w-2/3 ">

              {/* <h1 className=" text-3xl text-blue-700 text-center h-10 "> Have A doubt <span className="  animate-bounce  inline-block text-9xl font-extrabold ">?</span></h1> */}
              <div>
  
    <div>
      <div className=" text-gray-800 items-center justify-center flex flex-col p-4 text-3xl">
        <p className="text-2xl font-bold mb-4 text-indigo-600">Have a doubt? Ask Doubt!</p>
        <div className="w-full max-w-md">
        
          <textarea  placeholder="Write your detailed doubt here..." className="text-black bg-gray-100
              font-normal w-full h-32 text-xs rounded-md shadow-sm mb-4 focus:border-indigo-700 focus:outline-none
              focus:shadow-outline flex-grow transition duration-200 appearance-none p-2 border-2
              border-gray-300"></textarea>
          <button  type="submit" className="inline-flex border border-indigo-500 focus:outline-none
              focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 animate-bounce hover:shadow-lg transition
              duration-300 justify-center rounded-md py-2 px-6 bg-indigo-600 text-sm font-medium text-white
              shadow-sm">Click me!</button>
        </div>
      </div>
   
    </div>
  </div>
</div>
            
            
            </div>
          
        </main>
    </main>
   
   </>
  )
}
