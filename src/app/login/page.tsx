"use client";

import { createClient } from "@/lib/supabase/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft, Loader2, Eye, EyeOff, Mail, Lock, AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        toast.success("Registration successful! Check your email for confirmation.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Logged in successfully!");
        window.location.href = "/builder";
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
      console.error("Auth error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-surface-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            QuickInvoice <span className="text-primary-400">PH</span>
          </span>
        </div>

        <Card className="glass border-surface-700/50 shadow-2xl overflow-hidden">
          <CardHeader className="text-center space-y-2 pb-8 flex flex-col items-center">
            <div className="w-16 h-1 bg-gradient-primary rounded-full mb-4" />
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-surface-400">
              Sign in to save your business details and access your invoice history.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Ethical Warning Box */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex gap-3 items-start animate-pulse mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest">Fraud Prevention Notice</h4>
                <p className="text-[10px] text-red-200/70 leading-relaxed">
                  Misuse of this tool for tax evasion or insurance fraud is a criminal offense under the PH National Internal Revenue Code.
                </p>
              </div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-surface-500" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-surface-900/50 border-surface-700/50"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-surface-500" />
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-surface-900/50 border-surface-700/50"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-surface-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isLoading || !agreed}
                className={cn(
                  "w-full font-semibold transition-all",
                  agreed ? "gradient-primary text-white" : "bg-surface-800 text-surface-500 cursor-not-allowed"
                )}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isSignUp ? "Create Account" : "Sign In")}
              </Button>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  checked={agreed} 
                  onCheckedChange={(checked: any) => setAgreed(checked as boolean)} 
                />
                <Label 
                  htmlFor="terms" 
                  className="text-[11px] leading-tight text-surface-400 font-medium cursor-pointer"
                >
                  I acknowledge that these documents are **Pro-forma Only** and I agree to the <Link href="/terms" className="text-primary-400 hover:underline">Terms of Use</Link> and <Link href="/compliance" className="text-primary-400 hover:underline">BIR Compliance</Link>.
                </Label>
              </div>
            </form>

            <div className="text-center">
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
              >
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </button>
            </div>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-surface-800" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-[#0f172a] px-2 text-surface-500 font-medium tracking-widest">Or social login</span>
              </div>
            </div>

            <Button 
              type="button"
              variant="outline"
              className={cn(
                "w-full h-11 font-semibold flex items-center justify-center gap-3 transition-all active:scale-95",
                agreed ? "bg-white hover:bg-slate-100 text-slate-900" : "bg-surface-800/50 text-surface-600 border-surface-800 pointer-events-none"
              )}
              onClick={handleGoogleLogin}
              disabled={isLoading || !agreed}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
                  </svg>
                  Login with Google
                </>
              )}
            </Button>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-surface-700/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface-950 px-2 text-surface-500 font-medium">Or continue as guest</span>
              </div>
            </div>

            <Link 
              href="/builder" 
              className={cn(
                buttonVariants({ variant: "outline" }), 
                "w-full h-11 border-surface-700/50 flex items-center justify-center transition-all rounded-lg",
                agreed ? "text-surface-300 hover:text-white hover:bg-surface-800/50" : "text-surface-600 pointer-events-none opacity-50"
              )}>
              Start Building Now
            </Link>
          </CardContent>
          <div className="p-6 bg-surface-900/50 border-t border-surface-700/50 text-center">
             <p className="text-xs text-surface-500">
               By signing in, you agree to our <Link href="/terms" className="text-surface-400 underline hover:text-primary-400">Terms of Use</Link> and <Link href="/privacy" className="text-surface-400 underline hover:text-primary-400">Privacy Policy</Link>.
             </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
