import { sendVerificationEmail } from "@/helpers/sendVerificationMail"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import bcrypt from "bcryptjs"

export async function POST(request: Request){
  await dbConnect()

  try {

    const {username, email, password} = await request.json();
    const existingUserVerifyedByUsername = await UserModel.findOne({
        username,
        isVerified: true
    })

    if(existingUserVerifyedByUsername){
         return Response.json({
            success: false,
            message: "username is already taken"
         }, {status: 400})
    }

    const existingUserByEmail = await UserModel.findOne({email})

    const verifyCode = Math.floor(100000 + Math.random() * 9000).toString()

    if(existingUserByEmail){
        if (existingUserByEmail.isVerified) {
            return Response.json({
                success: false,
                message: "User already exist with this user"
           }, { status: 500})
        }else{
            const hasedPassword = await bcrypt.hash(password,10)
            existingUserByEmail.password = hasedPassword;
            existingUserByEmail.verifyCode = verifyCode;
            existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
            await existingUserByEmail.save()
        }
    }else{
        const hashPassword = await bcrypt.hash(password,10)
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)

       const newUser =  new UserModel({
                username,
                email,
                password: hashPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
        })

        await newUser.save()
    }
    

    //send verification mail
    const emailResponse = await sendVerificationEmail(
        email,
        username,
        verifyCode
    ) 

    if(!emailResponse.success){
       return Response.json({
            success: false,
            message: emailResponse.message
       }, { status: 500})
    }

    return Response.json({
        success: true,
        message: "User register successfully"
   }, { status: 201})


  } catch (error) {
    console.log('Erorr registering user', error);
    return Response.json(
        {
            success: false,
            message: "Error registering user"
        },
        {
           status:500 
        }
    )
  }
}