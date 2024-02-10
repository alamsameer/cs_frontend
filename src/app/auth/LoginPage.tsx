

// import { buttonVariants } from "@/registry/new-york/ui/button"
import {UserAuthForm} from "./components/userInput.tsx"


export default function LoginPage() {
  return (
    <>
      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none  lg:px-0">
        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
               Login your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your account credential to login
              </p>
            </div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  )
}