import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from "../features/auth/authActions"
import Error from "../components/Error"
import { CgSpinnerAlt } from "react-icons/cg"
import { useEffect } from "react"

const formSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().min(2).max(200),
  password: z.string().min(1).max(200),
})

export default function Register() {
  const { loading, userInfo, error, success } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (success) navigate("/login")
    if (userInfo) navigate("/profile")
  }, [navigate, userInfo, success])

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(registerUser(values))
  }

  return (
    <div>
      <h1>Register</h1>
      <Form {...form}>
        {error && <Error>{error}</Error>}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading}>
            {loading ? <CgSpinnerAlt className="animate-spin" /> : "Register"}
          </Button>
        </form>
      </Form>

      <p>
        You have an account already? <Link to="/login">Login</Link>
      </p>
    </div>
  )
}
