"use client"

import { KeyIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input, Button, Link } from "@nextui-org/react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import {z} from "zod"

type Props = { callbackURL?: string }

const FormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string({ required_error: "Please enter your password" })
})

type InputType = z.infer<typeof FormSchema>

export default function SignInForm(props: Props) {
    const [isVisiblePass, setIsVisiblePass] = React.useState<boolean>(false);

    const router = useRouter();

    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting}
    } = useForm<InputType>({ resolver: zodResolver(FormSchema) })

    const onSubmit: SubmitHandler<InputType> = async(data) => {
        const result = await signIn("credentials", { 
            redirect: false,
            username: data.email,
            password: data.password 
        })

        if(!result?.ok){
            toast.error(result?.error)
            return
        }

        toast.success("Welcome to The Application")
        router.push(props.callbackURL ? props.callbackURL : "/")
    }

    return (
      <form
        className="flex flex-col gap-2 p-2 border rounded md:shadow overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center">
          Sign In Form
        </div>

        <div className="p-2 flex flex-col gap-2">
            <Input
                label="Email"
                {...register("email")}
                errorMessage={errors.email?.message}
            />

            <Input
                label="Password"
                {...register("password")}
                errorMessage={errors.password?.message}
                type={isVisiblePass ? "text" : "password"}
                startContent={<KeyIcon className="w-4" />}
                className="col-span-2"
                endContent={
                <button
                    onClick={() => setIsVisiblePass((prevState) => !prevState)}
                >
                    {!isVisiblePass ? (
                    <EyeIcon className="w-4" />
                    ) : (
                    <EyeSlashIcon className="w-4" />
                    )}
                </button>
                }
            />
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            type="submit"
            color="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

          <Button as={Link} href="/auth/signup">
            Sign up
          </Button>
        </div>
      </form>
    );
}