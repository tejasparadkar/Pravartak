  import logo from "../../../public/vite.svg";

  import { Button } from "@/components/ui/button";
  import {
    Form,
    FormControl,  
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useNavigate } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { useToast } from "@/components/ui/use-toast";
  import { setId, setRole, setToken } from "@/store/actions/authAction";
  import axios, { AxiosResponse } from "axios";

  const FormSchema = z.object({
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    name: z.string(),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    role: z.string().min(2, {
      message: "Role must be at least 2 characters.",
    }),
    phone: z.string().min(10, {
      message: "Phone must be at least 10 characters.",
    }),
  });

  export default function SignUp() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        email: "",
      },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
      try {
        const response: AxiosResponse = await axios.post(
          "http://localhost:7000/api/v1/auth/register",
          data
        );

        if (response.ok) {
          console.log("Login successful");
          dispatch(setToken(response.data.token));
          dispatch(setId(response.data.user._id));
          dispatch(setRole(response.data.user.role));
          toast({
            title: "Resigtration Success",
            description: "Redirecting",
            className: "font-Geist bg-green-500 text-white rounded-xl",
          });

          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }

    return (
      <>
        <div className="grid grid-cols-8">
          <div className="h-screen bg-black col-span-5"></div>
          <div className="flex flex-col py-10 px-10 font-Geist col-span-3">
            <div id="logo" className="w-14 h-14 rounded-xl bg-blue-100">
              <img src={logo} />
            </div>
            <div className="py-10">
              <h1 className="font-semibold text-2xl">Sign Up</h1>
              <p className="text-[#8F8F8F] pt-2">
                Create a free account to get started
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="name" {...field} />
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
                      <FormLabel className="font-semibold">Email</FormLabel>
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
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="91 92324151242" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="font-Geist">
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="lp">Logistics Provider</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#5673DA] hover:bg-[#5673DA]"
                >
                  Register
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </>
    );
  }
