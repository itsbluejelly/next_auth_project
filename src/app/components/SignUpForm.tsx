"use client"

import { Button, Checkbox, Input, Link } from "@nextui-org/react"
import {UserIcon, EnvelopeIcon, KeyIcon, PhoneIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/20/solid" 
import React from "react"

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