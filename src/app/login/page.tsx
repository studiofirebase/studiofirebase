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
import { Separator } from "@/components/ui/separator";
import { Camera, Facebook, Mail, Twitter } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl text-primary">
              Welcome Back
            </CardTitle>
            <CardDescription>
              The most secure way to access your content.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 p-8 text-center">
              <div className="rounded-full border-4 border-primary/20 bg-primary/10 p-4">
                <Camera className="h-12 w-12 text-primary" />
              </div>
              <p className="font-headline text-lg">
                Login with your Face
              </p>
              <Button size="lg" className="w-full">
                Scan Face to Login
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" variant="outline">Sign in with Email</Button>
            <div className="grid grid-cols-2 gap-4 w-full">
                <Button variant="outline"><Facebook className="mr-2 h-4 w-4" /> Facebook</Button>
                <Button variant="outline"><Twitter className="mr-2 h-4 w-4" /> Twitter</Button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="#"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
