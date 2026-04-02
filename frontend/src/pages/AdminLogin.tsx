import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAdminAuthenticated, setAdminSession } from "@/lib/adminAuth";
import { apiPost } from "@/lib/api";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedCode = accessCode.trim();

    if (!normalizedEmail || !normalizedCode) {
      setError("Enter your email and access code.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await apiPost<{ token: string; email: string; expiresAt: number }, { email: string; accessCode: string }>(
        "/admin/login",
        {
          email: normalizedEmail,
          accessCode: normalizedCode,
        },
      );

      if (!response.success) {
        setError(response.message || "Login failed.");
        setIsSubmitting(false);
        return;
      }

      setAdminSession({
        email: response.data.email,
        token: response.data.token,
        expiresAt: response.data.expiresAt,
      });
      navigate("/admin", { replace: true });
    } catch (err) {
      setError("Unable to sign in. Check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 gradient-bg-subtle" />
      <div className="absolute -top-32 right-[-10%] h-80 w-80 rounded-full bg-accent/70 blur-3xl" />
      <div className="absolute -bottom-24 left-[-5%] h-72 w-72 rounded-full bg-secondary/80 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center gap-6">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
              Admin Access
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-balance sm:text-5xl">
              Verify your access before entering the control room.
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              This space is reserved for trusted operators managing settlements, disruptions, and policy workflows.
            </p>
            <div className="rounded-2xl border border-border/70 bg-card/80 p-6 shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-foreground">Need access?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Use your approved admin email and the rotating access code provided by the team.
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                Access is verified on the server before entry is granted.
              </p>
            </div>
          </div>

          <Card className="h-fit border-border/70 bg-card/90 shadow-xl backdrop-blur">
            <CardHeader>
              <CardTitle>Admin login</CardTitle>
              <CardDescription>Provide your credentials to continue.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@gigsurance.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-code">Access code</Label>
                  <Input
                    id="admin-code"
                    type="password"
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(event) => setAccessCode(event.target.value)}
                    autoComplete="one-time-code"
                  />
                </div>
                {error ? <p className="text-sm text-destructive">{error}</p> : null}
                <Button className="w-full" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Checking..." : "Enter admin console"}
                </Button>
              </form>
              <p className="mt-6 text-xs text-muted-foreground">
                Return to <Link className="text-foreground underline-offset-4 hover:underline" to="/">GigSurance</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
