"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import axios from "axios"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [input,setInput]=useState({username:'',password:''})
  const [errorMessage,setErrorMessage]=useState('')
const navigate=useNavigate()
  async function onSubmit(event: React.SyntheticEvent) {
    try{

      event.preventDefault()
      setIsLoading(true)
      const {username,password}=input
      console.log({username,password})
      const res=await axios.post('http://localhost:4000/api/admin/signin',{username,password})
      setIsLoading(false)
      localStorage.setItem('cstoken',res.data.token)
      navigate('/')
      console.log(res.data.token);
    }
    catch(err){
      console.log(err);
      setIsLoading(false)
      setErrorMessage(`Invalid username or password ${err.message}`)
    }
  }
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value}=e.target
    setInput({...input,[name]:value})
   
    
  }
  console.log(input);
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="admin"
              type="text"
              disabled={isLoading}
              value={input.username}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              disabled={isLoading}
              value={input.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            Sign In
          </Button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </form>
    </div>
  )
}