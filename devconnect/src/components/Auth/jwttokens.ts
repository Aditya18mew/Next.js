
import { FindOne } from "@/db"
import jwt from "jsonwebtoken"




const ACCESS_TOKEN_SECRET=process.env.ACCESS_TOKEN_SECRET
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET


export async function generatejwtToken(email:string){
  const Currentuser=await FindOne(email)

  if(typeof ACCESS_TOKEN_SECRET!=="string"){
    throw new Error("Access token must be defined")
  }
  if(typeof REFRESH_TOKEN_SECRET!=="string"){
    throw new Error("Refresh token must be defined")
  }
 
    const AccessToken=jwt.sign({
        id:Currentuser._id,
        Email:Currentuser.Authdetails.Email
      },ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

    const RefreshToken=jwt.sign({
        id:Currentuser._id,
        Email:Currentuser.Authdetails.Email
      },REFRESH_TOKEN_SECRET,{expiresIn:"7d"})

     Currentuser.Authdetails.RefreshToken=RefreshToken
     Currentuser.Authdetails.RefreshtokencreateDate=Date.now()
     Currentuser.Authdetails.RefreshtokenexpiryDate=Date.now() + 7*24*60*60*1000
     await Currentuser.save()
    return {AccessToken:AccessToken,RefreshToken:RefreshToken}  

}

export async function removejwtToken(email:string){
  const Currentuser=await FindOne(email)
 if(!Currentuser) return {success:false,message:"unable to logout try again"}
 try{
    Currentuser.Authdetails.RefreshToken=null
     Currentuser.Authdetails.RefreshtokencreateDate=null
     Currentuser.Authdetails.RefreshtokenexpiryDate=null
     await Currentuser.save()
     return {success:true,message:"logout successful"}
 }catch(err){
  console.log(err)
 }
}