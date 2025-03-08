import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import  {ApiResponse } from "@/types/ApiResponse"

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Anonymouse-Message | Verification code',
            react: VerificationEmail({username, otp:verifyCode}),
          });
        
          console.log("otp verifing data",data);
          

        return {success: true, message: 'Verification email send successfully'}
        
    } catch (emailError) {
        console.log("error sending verificatiion email", email);
        return {success: false, message: 'failed to send verification email'}
        
    }
}