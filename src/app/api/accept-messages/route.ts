import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnection from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from "next-auth"


export async function POST(request: Request){
    await dbConnection()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !session.user ){
        return Response.json({
            success: false,
            message: "not authentication"
        }, {status: 401})
    }

    const userId = user._id;
    const {acceptMessage} = await request.json()

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessage},
            {new: true}
        )

        if (!updatedUser) {
            return Response.json({
                success: false,
                message: "failed to update user status to accept message"
            }, {status: 401})
        }

        return Response.json({
            success: true,
            message: "Message accepted status update successfully"
        }, {status: 200})
        
    } catch (error) {
        return Response.json({
            success: false,
            message: "failed to update user status to accept message"
        }, {status: 500})
    }
}


export async function GET(request: Request){
    
    await dbConnection()

    try {
        const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if(!session || !session.user ){
        return Response.json({
            success: false,
            message: "not authentication"
        }, 
        {status: 401}
        )
    }

    const userId = user._id;

    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
        return Response.json({
            success: false,
            message: "User not found"
        }, {status: 404})
    }

    return Response.json({
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage
    }, {status: 200})

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error in getting message acceptance status"
        }, {status: 500})
    }
}