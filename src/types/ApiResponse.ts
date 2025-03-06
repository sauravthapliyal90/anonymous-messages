import { Message } from "@/model/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingMessage?: boolean //we dont need to send msg in signup
    messages?: Array<Message>
}