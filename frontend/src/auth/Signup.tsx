import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail, User, Phone } from "lucide-react";
import { FormEvent, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";

type SignUpInputState = {
    name: string;
    email: string;
    password: string;
    contact: string;
}

const Signup = () => {
  const isLoading = false;

  const [input, setInput] = useState<SignUpInputState>({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(prevInput => ({ ...prevInput, [name]: value }));
  }

  const signupSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(input);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="bg-white p-8 w-full max-w-md rounded-lg shadow-md" onSubmit={signupSubmitHandler}>
        <div className="mb-6">
          <h1 className="font-bold text-3xl text-center text-gray-800">
            Flavor Fiesta
          </h1>
        </div>
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1 text-left"
            >
              Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                type="text"
                value={input.name}
                onChange={changeEventHandler}
                placeholder="Enter your Name"
                className="pl-10 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1 text-left"
            >
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="Enter your Email Address"
                className="pl-10 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1 text-left"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Enter your Password"
                className="pl-10 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <LockKeyhole
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Contact Field */}
          <div>
            <Label
              htmlFor="contact"
              className="block text-sm font-medium text-gray-700 mb-1 text-left"
            >
              Contact
            </Label>
            <div className="relative">
              <Input
                id="contact"
                name="contact"
                type="tel"
                value={input.contact}
                onChange={changeEventHandler}
                placeholder="Enter your Contact Number"
                className="pl-10 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <Button disabled className="bg-orange hover:bg-hoverOrange w-full">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Wait...
            </Button>
          ) : (
            <Button type="submit" className="bg-orange hover:bg-hoverOrange w-full">
              Signup
            </Button>
          )}
        </div>
        <Separator className="mt-4"/>
        <p className="mt-2">
          Already have an account?{"  "} 
          <span>
            <Link to="/login" className="text-blue-500">
               Login
            </Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;