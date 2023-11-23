import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Link } from "react-router-dom";

const SigninForm = () => {
  const isLoading = false;
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignupValidation>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <div className="flex flex-col">
        <h1 className="text-center text-3xl font-bold">Log in to AlgoSync</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-5 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
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
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isLoading ? <div className="flex-center gap-2">Loading...</div> : "Sign in"}</Button>
        </form>
        <p className="mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="underline cursor-pointer">
            Sign up
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SigninForm;
