"use client"
import { useParams } from "next/navigation"
export default function myDoubt(){
const params = useParams();




    return (
        <div className=" h-screen w-screen flex justify-center items-center b">
hi
<span>
    {params.mydoubt}
</span>
        </div>
    )
}