import { useCreateUser } from "@/api/hooks/useCreateUser";
import { Button, Card, Input, Select } from "@/shared/components/ui";
import { Label } from "@/shared/components/ui/label";
import {
  CreateUserSchema,
  type CreateUserSchemaDto,
} from "@/shared/schemas/user.schema";
import { useToastStore } from "@/stores/toastStore";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function RegisterPage() {
  const [formData, setFormData] = useState<CreateUserSchemaDto>({
    name: "",
    last_name: "",
    second_last_name: "",
    phone: "",
    user_type: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const createUser = useCreateUser();
  const navigate = useNavigate();
  const { addToast } = useToastStore();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (formData.password !== confirmPassword) {
      addToast("error", "Las contraseñas no coinciden");
      return;
    }

    try {
      const validateData = CreateUserSchema.parse(formData);

      if (!validateData) {
        return;
      }

      console.log("Datos de registro:", formData);
      const response = await createUser.mutateAsync(validateData);
      console.log("Respuesta del registro:", response);

      navigate("/dashboard/sign-document");
    } catch (error) {
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div className="p-6">
      <Card.Root className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-white">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">Nombre</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    formData.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }`}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Primer Apellido
                </Label>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Ingresa tu primer apellido"
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    formData.last_name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }`}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Segundo Apellido
                </Label>
                <Input
                  id="second_last_name"
                  type="text"
                  placeholder="Ingresa tu segundo apellido"
                  value={formData.second_last_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      second_last_name: e.target.value,
                    })
                  }
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    formData.second_last_name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }`}
                  required
                />
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
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                  formData.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : ""
                }`}
                required
              />
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
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    formData.password
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }`}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Confirmar Contraseña
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    confirmPassword
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }`}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Ingresa tu teléfono"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                    formData.phone
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : ""
                  }`}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-purple-700 font-medium">
                  Tipo de Usuario
                </Label>
                <Select.Root
                  value={formData.user_type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, user_type: value })
                  }
                >
                  <Select.Trigger
                    className={`h-12 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 ${
                      formData.user_type
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                        : ""
                    }`}
                  >
                    <Select.Value placeholder="Selecciona el tipo de usuario" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="admin">Administrador</Select.Item>
                    <Select.Item value="user">Usuario</Select.Item>
                    <Select.Item value="moderator">Moderador</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={createUser.isPending}
            >
              {createUser.isPending ? (
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
                  to="/dashboard/sign-document"
                  className="text-purple-600 hover:text-purple-700 font-medium underline"
                >
                  Ir al Dashboard
                </Link>
              </p>
            </div>
          </form>
        </Card.Content>
      </Card.Root>
    </div>
  );
}
