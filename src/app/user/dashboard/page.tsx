"use client"

import axios from "axios";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import DoubtsList from "@/app/mycomponents/mydoubt";
import { useRouter } from "next/navigation";
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
 
 <div className="mx-auto container p-4 ">
   <div className="bg-white shadow-md rounded-lg p-6">
     <div className="items-center mb-4 flex">
     <div className=" transition transform hover:scale-105 rounded-full w-16 h-16 mr-4 shadow-lg dark:text-white text-center flex  justify-center items-center  dark:bg-slate-900"><span className=" text-4xl   font-sans font-semibold ">{userdata.name.substring(0,1).toUpperCase() || ''}</span></div>
       <p className="text-xl font-semibold text-gray-900">User Dashboard</p>
     </div>
     <div className="md:grid-cols-2 grid grid-cols-1 gap-6">
       <div>
         <p className="text-lg font-semibold text-gray-800 mb-2">Personal Information</p>
         <p className="text-md text-gray-700">
           <span className="font-medium">Name:</span>
           {userdata.name.charAt(0).toUpperCase() + userdata.name.slice(1).toLowerCase()}
         </p>
         <p className="text-md text-gray-700">
           <span className="font-medium">Email:</span>
          {userdata.email}
         </p>
         <p className="text-md text-gray-700">
           <span className="font-medium">Username:</span>
           {userdata.username}
         </p>
         <p className="text-md text-gray-700">
           <span className="font-medium">Admission Year:</span>
           {userdata.admissionYear}
         </p>
         <p className="text-md text-gray-700">
           <span className="font-medium">Branch:</span>
           {userdata.branch}
         </p>
       </div>
       <div>
         <p className="text-lg font-semibold text-gray-800 mb-2">Account Status</p>
         <p className="text-md text-gray-700">
           <span className="font-medium">Account Created:</span>
          {userdata.createdAt.substring(0,10)||"not available"}
         </p>
         <p className="text-md text-gray-700">
           <span className="font-medium">Last Updated:</span>
           {userdata.updatedAt.substring(0,10)}
         </p>
       </div>
     </div>
     <div className="mt-6">
       <button  type="button" className="inline-flex border border-indigo-500 focus:outline-none
           focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105
           justify-center rounded-md py-2 px-4 bg-indigo-600 text-md font-medium text-white shadow-sm">Update
           Profile</button>
       <button  onClick={Logout} type="button" className="inline-flex border border-red-500 focus:outline-none
           focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 ml-4
           justify-center rounded-md py-2 px-4 bg-red-600 text-md font-medium text-white shadow-sm">Logout
           Account</button>
     </div>
   </div>
 </div>
 </div> 
     <DoubtsList/>    
         
         
            </>
        )
    
}