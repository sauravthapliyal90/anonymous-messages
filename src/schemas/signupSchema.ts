import {z} from 'zod'

// here we dont used object cuz it has only one value
export const usernameValidation = z.
     string()
     .min(2, "Username must be atleast 2 charater")
     .max(20, "Username must be no more than 20 charaters")
     .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special charater")


export const  signupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(6, {message: "Password must be at least 6 charater"})
})   