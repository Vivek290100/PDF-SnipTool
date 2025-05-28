import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginFormData, loginSchema } from "@/utils/authValidation";
import { useAppDispatch } from "@/redux/store";
import { login } from "@/redux/thunks/authThunks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    await dispatch(login(data));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white px-4">
      <Card className="w-full max-w-md bg-card text-card-foreground rounded-lg shadow-xl p-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Welcome Back!</CardTitle>
          <p className="text-sm text-center text-muted-foreground">Login to Your Account</p>
        </CardHeader>

        <form onSubmit={handleSubmit(handleLogin)}>
          <CardContent className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                {...register("email")}
                type="email"
                placeholder="Email Address"
                className="pl-10 bg-input border-border text-white focus:ring-2 focus:ring-primary"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

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
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90"
            >
              {loading ? "Logging In..." : "Login"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-400 hover:underline">Sign Up</a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}