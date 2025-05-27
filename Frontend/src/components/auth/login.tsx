import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/thunks/authThunks";
import { LoginFormData, loginSchema } from "@/utils/validations/authValidation";
import { AppDispatch, RootState } from "@/redux/store";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const resultAction = await dispatch(login(data));
      console.log("yyyyyyyyyyyy", resultAction);

      if (login.fulfilled.match(resultAction)) {
        const userRole = resultAction.payload?.user?.role;
        // console.log("==================",userRole);

        if (userRole === "user") {
          navigate("/userDashboard");
        } else {
          navigate("/adminDashboard");
        }
      } else {
        const errorMessage = (resultAction.payload as string) || "Login failed";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white px-4">
      <Card className="w-full max-w-md bg-card text-card-foreground rounded-lg shadow-xl p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Welcome Back!</CardTitle>
          <p className="text-sm text-center text-muted-foreground">
            Login to Your Account
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit(handleLogin)}>
          <CardContent className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="pl-10 bg-input border-border text-white focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 pr-10 bg-input border-border text-white focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
              disabled={loading} // Disable button while loading
            >
              {loading ? <Loader className="h-5 w-5 animate-spin" /> : "Login"}
            </Button>

            <div className="flex items-center w-full">
              <div className="flex-grow h-[1px] bg-border"></div>
              <span className="mx-2 text-muted-foreground">or</span>
              <div className="flex-grow h-[1px] bg-border"></div>
            </div>

            <Button className="w-full flex text-foreground items-center justify-center gap-2 bg-input hover:bg-gray-700">
              <FcGoogle className="h-5 w-5" /> Login with Google
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-400 hover:underline">
                Sign Up
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  );
}
