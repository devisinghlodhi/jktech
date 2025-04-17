"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  password?: string
  image?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, you would check with your backend
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // In a real app, you would call your API
      // This is a mock implementation
      const alluserdata = localStorage.getItem("users");
      const alluser = alluserdata ? JSON.parse(alluserdata) : [];

      if (email === "admin@gmail.com" && password === "Admin@123") {
        const mockUser: User = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        }

        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        router.push("/dashboard")
      } 
    //   else if (email === "user@example.com" && password === "password") {
    //     const mockUser: User = {
    //       id: "2",
    //       name: "Regular User",
    //       email: "user@example.com",
    //       role: "user",
    //     }

    //     setUser(mockUser)
    //     localStorage.setItem("user", JSON.stringify(mockUser))
    //     router.push("/dashboard")
    //   } 
      else {
        const validUser = alluser.find((item: User)=> item.email == email && item.password == password);
        if(validUser){
            setUser(validUser)
            localStorage.setItem("user", JSON.stringify(validUser))
            router.push("/dashboard")
        }else{
            throw new Error("Invalid credentials")    
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      // This is a mock implementation
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: "user",
        password: password,
      }

      setUser(mockUser)
      const alluserdata = localStorage.getItem("users");
      const alluser = alluserdata ? JSON.parse(alluserdata) : [];
      const isExist = alluser.find((item: User)=> item.email == mockUser.email)
      if(isExist){
        const updatedAlluser = alluser.map((item: User)=>{
            if(item.email == mockUser.email){
                item.name = mockUser.name,
                item.password = mockUser.password
            }
            return item;
        })
        localStorage.setItem("users", JSON.stringify(updatedAlluser))
      }else{
        alluser.push(mockUser)
        localStorage.setItem("users", JSON.stringify(alluser))
      }
      router.push("/login")
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, loading, error }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
