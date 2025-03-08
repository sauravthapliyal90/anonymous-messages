import dbConnection from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import {usernameValidation} from "@/schemas/signupSchema"


export async function POST(request: Request){
    await dbConnection();

    try {
        const {username, code} = await request.json()

        //when data come from url it conert % and other to normal 
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username: decodedUsername})
        
       if (!user) {
          return Response.json({
              success: false,
              message: "User not found"
             },
             {  status: 500}
          )
       }

       const isCodeValid = user.verifyCode == code
       const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

       if (isCodeValid && isCodeNotExpired) {
           user.isVerified = true;
           await user.save()
          
           return Response.json({
            success: true,
            message: "Account Verified successfully"
           },
           {  status: 200}
           )

       } else if(!isCodeNotExpired) {
        return Response.json({
            success: false,
            message: "Verification code has expired please singnup again to get new code"
           },
           {  status: 400}
        )
       }else{
        return Response.json({
            success: false,
            message: "Incorrect Verification code"
           },
           {  status: 400}
        )
       }


    } catch (error) {
        console.error("error verifying user", error)
        return Response.json({
            success: false,
            message: "error verifying user"
        },
         {  status: 500}
    )
    }
}
