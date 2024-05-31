"use client"


import axios from "axios";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import DoubtsList from "@/app/mycomponents/mydoubt";
import { useRouter } from "next/navigation";
import Askdoubt from "@/app/mycomponents/askFormdoubts";
export default function Profile(){
  const router = useRouter();
    const [username ,setUsername] = useState("");
    const [email ,setemail] = useState("");
    const [admission ,setadmission] = useState();
    const [name ,setname] = useState("");
    const[branch , setbranch]= useState("");
    const[loading , setloading ] = useState(true);
    const [userdata, setUserdata] = useState<any>(null);

 

  

   async function getUser(){
    try {
        setloading(true);
        
        const response = await fetch("/api/users/getUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          
        });
         const data = await response.json();
       console.log("data is" + data.body.success);
       console.dir(data.body)
        if (!data.body.success) {
          const data = await response.json();
          showErrorToast(data.body.message || "Failed to sign in");
          return;
        }
     const data2 = data.body.data;
       setUserdata(data2);
        showSuccessToast(data.message);
        // Redirect to dashboard or desired page after successful sign-in
       setloading(false)
      } catch (error) {
        console.error(error);
        showErrorToast("Failed to submit the form");
      } 
    }

 useEffect(()=>{
    getUser()

 },[])
  
    function showErrorToast(message: string) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  
    function showSuccessToast(message: string) {
      toast({
        title: "Successful",
        description: message,
        action: (
          <ToastAction altText="Go to dashboard">User detail fetchd succefull</ToastAction>
        ),
      });
    }

    async function Logout() {
      try {
        await axios.get('/api/users/logout');
        showSuccessToast("Logout successfully");
        router.push('/sign-up');
      } catch (error) {
        console.error(error);
        showErrorToast("Failed to logout");
      }
    }







    
        if(loading){
  return(
    <>
    <div className=" bg-red-50  text-7xl">loding</div>
    </>
  )
        }
        console.log("setuserdata")
        console.log(userdata?.name)
        return(
            <>
            <div>
 
 <div className="mx-auto container grid grid-cols-3 gap-[75px] p-4 h-[900px]">
   <div className="bg-blue-100 dark:bg-gray-600 dark:text-gray-200 h-[840px] w-[335px] shadow-md rounded-lg p-6">
     <div className="items-center mb-4 justify-center flex">
     <div className=" bg-green-100 justify-centre  transition transform hover:scale-105 rounded-full w-16 h-16 mr-4 shadow-lg dark:text-gray-200 text-center flex  justify-center items-center  dark:bg-slate-900"><span className=" text-4xl   font-sans font-semibold ">{userdata.name.substring(0,1).toUpperCase() || ''}</span></div>
     
     </div>
     <p className="text-3xl font-semibold dark:text-gray-200 text-gray-900 ml-[34px] mt-[35px]">User Dashboard</p> 
     <div className="md:grid-cols-2 items-center grid grid-cols-1 gap-6">
       <div className="mt-[35px] w-[270px] ml-[30px] ">
         <p className="text-lg font-semibold text-gray-800 dark:text-gray-200  mb-2">Personal Information</p>
         <p className="text-md mt-[20px] dark:text-gray-200 text-gray-700">
           <span className="font-medium dark:text-gray-200 ">Name :  </span>
           {userdata.name.charAt(0).toUpperCase() + userdata.name.slice(1).toLowerCase()}
         </p>
         <p className="text-md mt-[11px] dark:text-gray-200 text-gray-700">
           <span className="font-medium dark:text-gray-200">Email :  </span>
          {userdata.email}
         </p>
         <p className="text-md mt-[11px] dark:text-gray-200 text-gray-700">
           <span className="font-medium dark:text-gray-200">Username :  </span>
           {userdata.username}
         </p>
         <p className="text-md mt-[11px] dark:text-gray-200 text-gray-700">
           <span className="font-medium dark:text-gray-200">Admission Year :  </span>
           {userdata.admissionYear}
         </p>
         <p className="text-md mt-[11px] dark:text-gray-200 text-gray-700">
           <span className="font-medium dark:text-gray-200">Branch :  </span>
           {userdata.branch}
         </p>
       </div>
       {/* <div>
         <p className="text-lg font-semibold text-gray-800 mb-2">Account Status</p>
         <p className="text-md text-gray-700">
           <span className="font-medium">Account Created:</span>
          {userdata.createdAt.substring(0,10)||"not available"}
         </p>
         <p className="text-md text-gray-700">
           <span className="font-medium">Last Updated:</span>
           {userdata.updatedAt.substring(0,10)}
         </p>
       </div> */}
     </div>
     <div className="mt-6 grid grid-cols-1 items-center h-[225px]">
       <button  type="button" className=" h-[45px] ml-[55px] w-[170px] inline-flex border border-indigo-500 focus:outline-none
           focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105
           justify-center rounded-md  py-2 px-4 bg-indigo-600 text-md font-medium text-white shadow-sm">Update
           Profile</button>
       <button  onClick={Logout} type="button" className="h-[45px] ml-[55px] w-[170px] inline-flex border border-red-500 focus:outline-none
           focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 
           justify-center rounded-md py-2 px-4 bg-red-500 text-md font-medium text-white shadow-sm">Logout
           Account</button>
     </div>
   </div>
   <div className="w-[850px] justify-center h-[840px] mt-[160px] grid grid-rows-2 gap-60">
     <div className="h-[500px] justify-center w-[550px]">
      <Askdoubt/>
     </div>
    
     
   </div>
 </div>
<div className=" h-[600px]  w-screen ml-[80px]">
<DoubtsList/> 
</div>

 </div> 
     {/* <DoubtsList/>     */}
         
         
            </>
        )
    
}