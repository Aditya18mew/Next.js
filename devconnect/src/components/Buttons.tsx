"use client"
import google from "@/components/icons/google.svg"
import github from "@/components/icons/github.svg"
import Image from "next/image";
import { redirect } from "next/navigation";


export function GithubButton(){
    return       <button className="extrabutton bg-slate-100 text-gray-700 shadow-sm"><Image src={github} alt="google" width={20} height={20}></Image>Github</button>
}

export function GoogleButton(){
    return         <button className="extrabutton bg-slate-100 text-gray-700 shadow-sm"><Image src={google} alt="google" width={20} height={20}></Image>Google</button>
}
export function BacktoHomebutton(){
 return  <div  className="BacktoHomediv"><button onClick={()=>redirect("/")}>Back to Home</button></div>
}