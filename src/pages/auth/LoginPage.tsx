import { Button, Card, Input } from "@/shared/components/ui";
import { Label } from "@/shared/components/ui/label";
import { useLogin } from "@/api/hooks/useLogin";
import { Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const loginMutation = useLogin();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      await loginMutation.mutateAsync({ email, password });
      navigate(from, { replace: true });
    } catch (error) {
      // El error ya se maneja en el hook
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg px-4">
      <Card.Root className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <Card.Header className="text-center pb-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-[var(--navy-600)] shadow-lg">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <Card.Title className="text-3xl font-bold bg-gradient-to-r from-[var(--navy-700)] to-teal-600 bg-clip-text text-transparent">
            BlockSign
          </Card.Title>
          <Card.Description className="text-gray-600 text-base">
            Accede a la plataforma de firma digital blockchain
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-blue-700 font-medium">
                Usuario
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-blue-700 font-medium">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500/20"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Iniciando sesión...
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                <Link 
                  to="/forgot-password" 
                  className="text-teal-600 hover:text-teal-700 font-medium underline"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </p>
            </div>
          </form>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
