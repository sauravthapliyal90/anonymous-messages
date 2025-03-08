import dbConnection from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import {usernameValidation} from "@/schemas/signupSchema"


const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request){

    await dbConnection();
     //localhost:3000/api/cuu?username=saurav?phone=9099
    try {
        const { searchParams } = new URL(request.url)
        const queryParams = {
     //username=saurav
            username: searchParams.get('username')
        }
     // validation with zod
       const result = UsernameQuerySchema.safeParse(queryParams)
       console.log("result",result); 

       if (!result.success) {
          const usernameError = result.error.format().username?._errors || []
          return Response.json({
            success: false,
            message: usernameError?.length > 0 ? usernameError.join(', '): 'Invalid query parameter',
          }, {status: 400})
       }

       const {username} = result.data 

       const existingVerifiedUser = await UserModel.findOne({username, isVerified: true})

       if (existingVerifiedUser) {
        return Response.json({
            success: false,
            message:  'Username is already taken',
          }, {status: 400})
       }

       return Response.json({
        success: true,
        message: 'Username is availabe',
      }, {status: 200})
       
    } catch (error) {
        console.error("error checking usernae", error)
        return Response.json({
            success: false,
            message: "error checking username"
        },
         {  status: 500}
    )
    }
}