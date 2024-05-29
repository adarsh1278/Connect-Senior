export default function profile( ){
    const name = "Adarsh"
    const email = "adarsh2226cs1009@kiet.edu"
    const username = "adarshchutiya"
    const admission = "2022"
    const branch = "cs"
    return
    (
        <div
        >
 
    <div className="mx-auto container p-4 ">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="items-center mb-4 flex">
        <div className=" transition transform hover:scale-105 rounded-full w-16 h-16 mr-4 shadow-lg dark:text-white text-center flex  justify-center items-center  dark:bg-slate-900"><span className=" text-4xl   font-sans font-semibold ">{name.substring(0,1).toUpperCase() || ''}</span></div>
          <p className="text-xl font-semibold text-gray-900">User Dashboard</p>
        </div>
        <div className="md:grid-cols-2 grid grid-cols-1 gap-6">
          <div>
            <p className="text-lg font-semibold text-gray-800 mb-2">Personal Information</p>
            <p className="text-md text-gray-700">
              <span className="font-medium">Name:</span>
              {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}
            </p>
            <p className="text-md text-gray-700">
              <span className="font-medium">Email:</span>
             {email}
            </p>
            <p className="text-md text-gray-700">
              <span className="font-medium">Username:</span>
              {username}
            </p>
            <p className="text-md text-gray-700">
              <span className="font-medium">Admission Year:</span>
              {admission}
            </p>
            <p className="text-md text-gray-700">
              <span className="font-medium">Branch:</span>
              {branch}
            </p>
          </div>
          
        </div>
        <div className="mt-6">
          <button  type="button" className="inline-flex border border-indigo-500 focus:outline-none
              focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105
              justify-center rounded-md py-2 px-4 bg-indigo-600 text-md font-medium text-white shadow-sm">Update
              Profile</button>
          <button  type="button" className="inline-flex border border-red-500 focus:outline-none
              focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 ml-4
              justify-center rounded-md py-2 px-4 bg-red-600 text-md font-medium text-white shadow-sm">Delete
              Account</button>
        </div>
      </div>
    </div>
    </div> 

    
    )
}
