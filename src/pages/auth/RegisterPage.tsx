import { Button, Card, Input, Select } from "@/shared/components/ui";
import { Label } from "@/shared/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.firstName) {
      newErrors.firstName = "El nombre es requerido";
    }

    if (!formData.lastName) {
      newErrors.lastName = "El apellido es requerido";
    }

    if (!formData.phone) {
      newErrors.phone = "El celular es requerido";
    }

    if (!formData.gender) {
      newErrors.gender = "Selecciona tu género";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simular delay de registro
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Datos de registro:", formData);

      // Simular registro exitoso
      setAuth({
        id: "1",
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      }, "1");
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el registro. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg px-4">
      <Card.Root className="w-full max-w-lg shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <Card.Header className="text-center pb-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <Card.Title className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            BlockSign
          </Card.Title>
          <Card.Description className="text-gray-600 text-base">
            Crea tu cuenta en la plataforma de firma digital blockchain
          </Card.Description>
        </Card.Header>
        <Card.Content className="space-y-6">
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Nombre
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    errors.firstName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  required
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Apellido
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Ingresa tu apellido"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    errors.lastName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  required
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-purple-700 font-medium">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                  errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Crea una contraseña"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Celular
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ingresa tu celular"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    errors.phone ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Género
                </Label>
                <Select.Root value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <Select.Trigger className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    errors.gender ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""
                  }`}>
                    <Select.Value placeholder="Selecciona tu género" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="masculino">Masculino</Select.Item>
                    <Select.Item value="femenino">Femenino</Select.Item>
                    <Select.Item value="otro">Otro</Select.Item>
                    <Select.Item value="prefiero-no-decir">Prefiero no decir</Select.Item>
                  </Select.Content>
                </Select.Root>
                {errors.gender && (
                  <p className="text-red-500 text-sm">{errors.gender}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creando cuenta...
                </div>
              ) : (
                "Crear Cuenta"
              )}
            </Button>

            <div className="text-center pt-4">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link 
                  to="/login" 
                  className="text-purple-600 hover:text-purple-700 font-medium underline"
                >
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
