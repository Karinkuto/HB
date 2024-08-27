import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@mui/material";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import useProductStore from "./ProductStore";

// Type for formData
interface FormData {
  username: string;
  password: string;
  phoneNumber: string;
  confirmPassword: string;
}

// Phone number validation function for Ethiopian numbers
const validatePhoneNumber = (phoneNumber: string): boolean => {
  const ethiopianPhoneRegex = /^0\d{2}-\d{3}-\d{4}$/;
  return ethiopianPhoneRegex.test(phoneNumber);
};

// Password validation (for example, minimum 6 characters)
const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

interface AuthProps {
  setIsAdmin: (isAdmin: boolean) => void;
}

export default function Auth({ setIsAdmin }: AuthProps) {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    phoneNumber: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loginMessage, setLoginMessage] = useState<string>("");

  const navigate = useNavigate();
  const { users, addUser, setLoginStatus } = useProductStore();

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    // Handle phone number formatting and validation
    if (name === "phoneNumber") {
      const formattedValue = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Format phone number as 0xx-xxx-xxxx
  const formatPhoneNumber = (value: string): string => {
    // Remove all non-numeric characters
    const cleanedValue = value.replace(/\D/g, "");

    // Format the cleaned value
    const match = cleanedValue.match(/^(\d{1,3})(\d{1,3})?(\d{1,4})?$/);

    if (match) {
      const part1 = match[1];
      const part2 = match[2] ? `-${match[2]}` : "";
      const part3 = match[3] ? `-${match[3]}` : "";

      return `${part1}${part2}${part3}`;
    }

    return cleanedValue;
  };

  // Form validation function
  const validate = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    // Password validation
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Phone number validation
    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Please enter a valid phone number in the format 0xx-xxx-xxxx";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Clear errors if validation passes
      setErrors({});
      // Add your form submission logic here
      console.log("Form submitted:", formData);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username === 'admin' && formData.password === 'admin') {
      console.log('Admin login successful');
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('isLoggedIn', 'true');
      setIsAdmin(true);
      setLoginStatus(true);
      setLoginMessage("Admin login successful. Redirecting...");
      setTimeout(() => navigate('/admin'), 1500);
    } else {
      const user = users.find(u => u.username === formData.username && u.password === formData.password);
      if (user) {
        console.log('User login successful');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        setLoginStatus(true);
        setLoginMessage("Login successful. Redirecting...");
        setTimeout(() => navigate('/'), 1500);
      } else {
        setLoginMessage('Invalid credentials');
      }
    }
  };

  const handleSignUp = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const newUser: User = {
        id: users.length + 1,
        username: formData.username,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        isAdmin: false,
      };
      addUser(newUser);
      alert('User registered successfully. Please log in.');
      // Reset form
      setFormData({
        username: "",
        password: "",
        phoneNumber: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Tabs defaultValue="login" className="w-[350px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="sign-up">Sign-Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your username and password to login.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {loginMessage && (
                  <div className={`text-center ${loginMessage.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
                    {loginMessage}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Sign in
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="sign-up">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSignUp}>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="Max" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Robinson" required />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <div style={{ position: "relative" }}>
                      <img
                        src="/flag.png" // Update this path to where the flag.png is located
                        alt="Ethiopian Flag"
                        style={{
                          position: "absolute",
                          left: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          height: 20,
                        }}
                      />
                      <Input
                        id="phone-number"
                        name="phoneNumber"
                        placeholder="0xx-xxx-xxxx"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        style={{ paddingLeft: 36 }} // Add padding to make space for the flag icon
                      />
                    </div>
                    {errors.phoneNumber && (
                      <span className="text-red-500">{errors.phoneNumber}</span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errors.password && (
                      <span className="text-red-500">{errors.password}</span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                  <Button type="submit" className="w-full">
                    Create an account
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{" "}
                  <a href="#" className="underline">
                    Sign in
                  </a>
                </div>
              </CardContent>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
}