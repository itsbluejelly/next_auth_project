"use client"

import { Button, Checkbox, Input, Link } from "@nextui-org/react"
import {UserIcon, EnvelopeIcon, KeyIcon, PhoneIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/20/solid" 
import React from "react"
import {z} from "zod"
import validator from "validator"

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name has minimum of 2 characters")
    .max(45, "First name has maximum of 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$", "No special characters allowed")),

  lastName: z
    .string()
    .min(2, "First name has minimum of 2 characters")
    .max(45, "First name has maximum of 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$", "No special characters allowed")),

  email: z.string().email("Please enter a valid email"),
  phone: z.string().refine(validator.isMobilePhone, "Please enter valid phone number"),
  
  password: z
    .string()
    .min(6, "Password has minimum of 6 characters")
    .max(50, "Password has maximum of 50 characters"),

  confirmPassword: z
    .string()
    .min(6, "Password has minimum of 6 characters")
    .max(50, "Password has maximum of 50 characters"),

  accepted: z.literal(true, { errorMap: () => ({ message: "Please accept all terms" })})
}).refine(data => data.password === data.confirmPassword, { 
  message: "Password and confirm password don't match!",
  path: ["password", "confirmPassword"] 
})

function SignUpForm() {
  const [isVisiblePass, setIsVisiblePass] = React.useState<boolean>(false)
  return (
    <form className="grid grid-cols-2 gap-3 p-2 shadow border rounded-md place-self-stretch">
      <Input label="First Name" startContent={<UserIcon className="w-4" />} />

      <Input label="Last Name" startContent={<UserIcon className="w-4" />} />

      <Input
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
        className="col-span-2"
      />

      <Input
        label="Phone"
        startContent={<PhoneIcon className="w-4" />}
        className="col-span-2"
      />

      <Input
        label="Password"
        type={isVisiblePass ? "text" : "password"}
        startContent={<KeyIcon className="w-4" />}
        className="col-span-2"
        endContent={
          !isVisiblePass ? (
            <EyeIcon
              className="m-4 cursor-pointer"
              onClick={() => setIsVisiblePass(false)}
            />
          ) : (
            <EyeSlashIcon
              className="m-4 cursor-pointer"
              onClick={() => setIsVisiblePass(true)}
            />
          )
        }
      />

      <Input
        label="Confirm Password"
        type="Password"
        startContent={<KeyIcon className="w-4" />}
        className="col-span-2"
      />

      <Checkbox className="col-span-2">
        I accept the <Link href="/terms">Terms</Link>
      </Checkbox>

      <div className="flex justify-center col-span-2">
        <Button 
          type="submit" 
          color="primary"
          className="w-48"
        >Submit</Button>
      </div>
    </form>
  );
}

export default SignUpForm