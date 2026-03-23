import { Button, Card, Input } from "@/shared/components/ui";
import { Label } from "@/shared/components/ui/label";
import { useResetPassword } from "@/api/hooks/useResetPassword";
import { KeyRound, Lock, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

export function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const resetPasswordMutation = useResetPassword();

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setPasswordError("Token de recuperación no válido o expirado");
      setTimeout(() => {
        navigate("/forgot-password");
      }, 3000);
    }
  }, [token, navigate]);

  const validatePasswords = () => {
    if (newPassword.length < 6) {
      setPasswordError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords() || !token) {
      return;
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        newPassword,
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg px-4">
        <Card.Root className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <Card.Header className="text-center pb-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-green-500 to-teal-600 shadow-lg">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <Card.Title className="text-3xl font-bold bg-linear-to-r from-green-700 to-teal-600 bg-clip-text text-transparent">
              ¡Contraseña Restablecida!
            </Card.Title>
            <Card.Description className="text-gray-600 text-base">
              Tu contraseña ha sido cambiada exitosamente
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Ahora puedes iniciar sesión con tu nueva contraseña.
              </p>
              <Button
                onClick={() => navigate("/login")}
                className="w-full h-12 bg-linear-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Ir al Login
              </Button>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    );
  }

  if (!token || passwordError === "Token de recuperación no válido o expirado") {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg px-4">
        <Card.Root className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <Card.Header className="text-center pb-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-red-500 to-orange-600 shadow-lg">
              <KeyRound className="h-8 w-8 text-white" />
            </div>
            <Card.Title className="text-3xl font-bold bg-linear-to-r from-red-700 to-orange-600 bg-clip-text text-transparent">
              Token Inválido
            </Card.Title>
            <Card.Description className="text-gray-600 text-base">
              El enlace de recuperación no es válido o ha expirado
            </Card.Description>
          </Card.Header>
          <Card.Content className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Redirigiendo a la página de recuperación...
              </p>
              <Button
                onClick={() => navigate("/forgot-password")}
                className="w-full h-12 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              >
                Solicitar Nuevo Enlace
              </Button>
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
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <Card.Title className="text-3xl font-bold bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
            Restablecer Contraseña
          </Card.Title>
          <Card.Description className="text-gray-600 text-base">
            Ingresa tu nueva contraseña
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-blue-700 font-medium">
                Nueva Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu nueva contraseña"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setPasswordError("");
                  }}
                  className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 pr-10 ${
                    passwordError ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-blue-700 font-medium">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError("");
                  }}
                  onBlur={validatePasswords}
                  className={`h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 pr-10 ${
                    passwordError ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              {!passwordError && confirmPassword && newPassword === confirmPassword && (
                <p className="text-green-500 text-sm">✓ Las contraseñas coinciden</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={resetPasswordMutation.isPending || !token}
            >
              {resetPasswordMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Restableciendo...
                </div>
              ) : (
                "Restablecer Contraseña"
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                <Link 
                  to="/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium underline"
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

