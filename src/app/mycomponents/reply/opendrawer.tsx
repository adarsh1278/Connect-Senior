"use client"
import * as React from "react"
 
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import Replyform from "./replyform"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
interface DoubtProps {
  
    doubtid: number;
    
}
 
export  default function DrawerDialogDemo({doubtid}:DoubtProps) {
    console.log("doub id in drwawrr" , doubtid)
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
 
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Repl</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[680px]  gap-3  p-7 drop-shadow-2xl shadow-2xl ">
          
          <Replyform className=" h-full " doubtid={doubtid}/>
         
        </DialogContent>
      </Dialog>
    )
  }
 
  
}
 
function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <Replyform/>
    
  )
}