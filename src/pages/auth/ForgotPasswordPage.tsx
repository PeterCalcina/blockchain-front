import { Button, Card, Input } from "@/shared/components/ui";
import { Label } from "@/shared/components/ui/label";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de envío
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simular envío exitoso
    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg px-4">
        <Card.Root className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <Card.Header className="text-center pb-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-teal-600 shadow-lg">
              <KeyRound className="h-8 w-8 text-white" />
            </div>
            <Card.Title className="text-3xl font-bold bg-gradient-to-r from-green-700 to-teal-600 bg-clip-text text-transparent">
              ¡Enviado!
            </Card.Title>
            <Card.Description className="text-gray-600 text-base">
              Te hemos enviado un enlace para restablecer tu contraseña
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Revisa tu correo electrónico y sigue las instrucciones para restablecer tu contraseña.
              </p>
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => navigate("/login")}
                  className="w-full h-12 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Volver al Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full h-12 border-teal-500 text-teal-600 hover:bg-teal-50"
                >
                  Enviar otro correo
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg px-4">
      <Card.Root className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <Card.Header className="text-center pb-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
            <KeyRound className="h-8 w-8 text-white" />
          </div>
          <Card.Title className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent">
            Recuperar Contraseña
          </Card.Title>
          <Card.Description className="text-gray-600 text-base">
            Ingresa tu correo electrónico para recibir un enlace de recuperación
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-orange-700 font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500/20"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Enviando...
                </div>
              ) : (
                "Solicitar Acceso"
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                <Link 
                  to="/login" 
                  className="text-orange-600 hover:text-orange-700 font-medium underline"
                >
                  Volver al Login
                </Link>
              </p>
            </div>
          </form>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
