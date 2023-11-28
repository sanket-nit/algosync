import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import axios from "@/api/axios";
import { toast } from "@/components/ui/use-toast";
import { ISignupResponse } from "@/types/auth";

const SignupForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    try {
      setIsLoading(true);
      const res = await axios.post<ISignupResponse>("/api/auth/signup", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      toast({
        title: "Success",
        description: `${res?.data?.message}. Please login`,
        variant: "default",
      });
      setIsLoading(false);
      navigate("/signin");
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);
      if (!err?.response) {
        toast({ title: "Error", description: "No reponse from server", variant: "destructive" });
      } else if (err?.response?.status === 400) {
        toast({ title: "Error", description: "Missing username, email or password", variant: "destructive" });
      } else if (err?.response?.status === 409) {
        toast({ title: "Error", description: "User already exists" });
      } else {
        toast({ title: "Error", description: err?.response?.data?.message, variant: "destructive" });
      }
    }
  }
  return (
    <div className="flex flex-col max-w-md">
      <Form {...form}>
        <h1 className="text-center font-bold md:text-5xl sm:text-3xl">
          Create Your <br />
          AlgoSync Account
        </h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-5 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="algomaster" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="algomaster@algo.com" {...field} />
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
                  <Input placeholder="&#128170; password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{isLoading ? <Spinner /> : "Sign up"}</Button>
        </form>
        <p className="mt-2">
          Already have an account?{" "}
          <Link to="/signin" className="underline cursor-pointer">
            Log in
          </Link>{" "}
        </p>
      </Form>
    </div>
  );
};

export default SignupForm;
