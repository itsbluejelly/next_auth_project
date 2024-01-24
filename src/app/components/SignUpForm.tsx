"use client"

import { Button, Checkbox, Input, Link } from "@nextui-org/react"
import {UserIcon, EnvelopeIcon, KeyIcon, PhoneIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/20/solid" 
import React from "react"
import {z} from "zod"
import validator from "validator"
import {Controller, SubmitHandler, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { passwordStrength } from "check-password-strength"

import PasswordComponent from "./PasswordComponent"
import { registerUser } from "@/src/lib/actions/authAction"
import { toast } from "react-toastify"

const FormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name has minimum of 2 characters")
    .max(45, "First name has maximum of 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),

  lastName: z
    .string()
    .min(2, "First name has minimum of 2 characters")
    .max(45, "First name has maximum of 45 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed"),

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
  path: ["confirmPassword"]
})

type InputType = z.infer<typeof FormSchema>

function SignUpForm() {
  const {
    register, 
    handleSubmit, 
    reset, 
    control, 
    formState:{errors},
    watch
  } = useForm<InputType>({ resolver: zodResolver(FormSchema) })

  const [isVisiblePass, setIsVisiblePass] = React.useState<boolean>(false)
  const [passStrength, setPassStrength] = React.useState<number>(0)
  
  const saveUser: SubmitHandler<InputType> = async(data) => {
    const {accepted, confirmPassword, ...user} = data

    try{
      const result = await registerUser(user)
      toast.success("User registered successfully")
    }catch(error){
      toast.error("Something went wrong")
      console.log((error as Error).message)
    }
  }

  React.useEffect(() => setPassStrength(passwordStrength(watch().password).id), [watch])

  return (
    <form
      className="grid grid-cols-2 gap-3 p-2 shadow border rounded-md place-self-stretch"
      onSubmit={handleSubmit(saveUser)}
    >
      <Input
        errorMessage={errors.firstName?.message}
        isInvalid={!!errors.firstName}
        {...register("firstName")}
        label="First Name"
        startContent={<UserIcon className="w-4" />}
      />

      <Input
        errorMessage={errors.lastName?.message}
        isInvalid={!!errors.lastName}
        {...register("lastName")}
        label="Last Name"
        startContent={<UserIcon className="w-4" />}
      />

      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register("email")}
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
        className="col-span-2"
      />

      <Input
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        {...register("phone")}
        label="Phone"
        startContent={<PhoneIcon className="w-4" />}
        className="col-span-2"
      />

      <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register("password")}
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
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        label="Confirm Password"
        type="Password"
        startContent={<KeyIcon className="w-4" />}
        className="col-span-2"
      />

      <PasswordComponent passStrength={passStrength}/>

      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <Checkbox
            className="col-span-2"
            onChange={field.onChange}
            onBlur={field.onBlur}
          >
            I accept the <Link href="/terms">Terms</Link>
          </Checkbox>
        )}
      />

      {!!errors.accepted && <p className="text-red-500">{errors.accepted?.message}</p>}

      <div className="flex justify-center col-span-2">
        <Button type="submit" color="primary" className="w-48">
          Submit
        </Button>
      </div>
    </form>
  );
}

export default SignUpForm
