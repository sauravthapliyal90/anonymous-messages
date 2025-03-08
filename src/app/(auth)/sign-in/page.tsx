"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback, useDebounceValue } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signupSchema } from "@/schemas/signupSchema"

function page() {
  const [username, setUsername] = useState('')
  const [usernameMessage,  stUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsename] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounceUsername = useDebounceValue(username, 300)
  const router = useRouter()

  //zod implementation
   const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
   })

   useEffect(() => {
      const checkUsernameUnique = async () => {
        if (debounceUsername) {
          
        }
      }
   }, [debounceUsername])

  return (
    <div>
      page
    </div>
  )
}

export default page
