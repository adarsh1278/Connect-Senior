
"use client"
import ProfileForm from "../mycomponents/signup"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import SignInForm from "../mycomponents/signin"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export  default function TabsDemo() {
  const { toast } = useToast();
  return (
    <div className=" w-screen flex justify-center  items-center mt-7 ">
    <div className=" flex items-center  mt-36 sm:w-1/2 lg:w-1/3 w-full" >
    <Tabs defaultValue="account" className=" w-full">
      <TabsList className="grid w-full grid-cols-2 text-lg h-16">
        <TabsTrigger value="account" className="h-full  sm:text-xl">Sign-Up</TabsTrigger>
        <TabsTrigger value="password" className="h-full  sm:text-xl">Sign-In</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className=" w-full">
        <Card className=" p-4">
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <ProfileForm/>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className=" p-6">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login here
            </CardDescription>
          </CardHeader>
          <SignInForm/>
        </Card>
      </TabsContent>
    </Tabs>
    </div>
    </div>
  )
}
