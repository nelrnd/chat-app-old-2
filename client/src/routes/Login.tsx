import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../components/ui/form"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Error from "../components/Error"
import { CgSpinnerAlt } from "react-icons/cg"
import { useEffect } from "react"
import { loginUser } from "../features/auth/authActions"

const formSchema = z.object({
  email: z.string().email().min(2).max(200),
  password: z.string().max(200),
})

export default function Login() {
  const { loading, userInfo, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    if (userInfo) {
      navigate("/profile")
    }
  }, [navigate, userInfo])

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(loginUser(values))
  }

  return (
    <div>
      <h1>Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {error && <Error>{error}</Error>}
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
            {loading ? <CgSpinnerAlt className="animate-spin" /> : "Login"}
          </Button>
        </form>
      </Form>

      <p>
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  )
}
