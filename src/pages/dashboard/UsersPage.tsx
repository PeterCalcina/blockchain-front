import { useState, useMemo } from "react";
import { Card } from "@/shared/components/ui/card";
import { Table } from "@/shared/components/ui/table";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { useListUsers } from "@/api/hooks/useListUsers";
import { useDeleteUser } from "@/api/hooks/useDeleteUser";
import { useUpdateUser } from "@/api/hooks/useUpdateUser";
import { Loader } from "@/shared/components/ui/loader";
import { User, Search, Edit, Trash2, X, Save } from "lucide-react";
import type { GetUserSchemaDto, UpdateUserSchema } from "@/shared/schemas/user.schema";
import { useToastStore } from "@/stores/toastStore";

export default function UsersPage() {
  const { data: users, isLoading } = useListUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<UpdateUserSchema>({});
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();
  const { addToast } = useToastStore();

  const handleEdit = (user: GetUserSchemaDto) => {
    setEditingId(user.id);
    setEditData({
      name: user.name,
      last_name: user.last_name,
      second_last_name: user.second_last_name,
      phone: user.phone,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    try {
      await updateUser.mutateAsync({
        id: editingId,
        data: editData,
      });
      setEditingId(null);
      setEditData({});
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de que deseas eliminar al usuario ${name}?`)) {
      return;
    }

    try {
      await deleteUser.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!users) return [];

    return users.filter((user: GetUserSchemaDto) => {
      const fullName = `${user.name} ${user.last_name} ${user.second_last_name || ""}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-br from-gray-50 to-teal-50/30">
      <header className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold bg-linear-to-r from-(--navy-700) to-teal-600 bg-clip-text text-transparent">
          Gestión de Usuarios
        </h1>
        <User className="h-5 w-5 text-amber-500 ml-2" />
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-linear-to-r from-(--navy-700) to-teal-600 bg-clip-text text-transparent mb-2">
              Gestión de Usuarios
            </h1>
            <p className="text-gray-600">
              Administra los usuarios del sistema
            </p>
          </div>

      {/* Buscador */}
      <Card.Root className="shadow-md border-0 bg-white/90 backdrop-blur-sm">
        <Card.Header className="bg-linear-to-r from-teal-50 to-(--navy-50) rounded-t-lg">
          <Card.Title className="flex items-center gap-3 text-(--navy-700)">
            <div className="p-2 rounded-lg bg-linear-to-br from-teal-500 to-(--navy-600)">
              <Search className="h-5 w-5 text-white" />
            </div>
            Buscar Usuarios
          </Card.Title>
        </Card.Header>
        <Card.Content className="p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Buscar por nombre</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar usuario por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 focus:border-purple-500 focus:ring-purple-500/20"
              />
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root className="shadow-md border-0 bg-white/90 backdrop-blur-sm">
        <Card.Header className="bg-linear-to-r from-teal-50 to-(--navy-50) rounded-t-lg">
          <Card.Title className="flex items-center gap-3 text-(--navy-700)">
            <div className="p-2 rounded-lg bg-linear-to-br from-teal-500 to-(--navy-600)">
              <User className="h-5 w-5 text-white" />
            </div>
            Lista de Usuarios
            <span className="ml-auto text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full">
              {filteredUsers.length} usuario{filteredUsers.length !== 1 ? "s" : ""}
            </span>
          </Card.Title>
        </Card.Header>

        <Card.Content className="p-6">
          {!users || users.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 rounded-full bg-gray-100 inline-block mb-4">
                <User className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No hay usuarios registrados</p>
              <p className="text-gray-400 text-sm mt-2">
                Los usuarios aparecerán aquí cuando se registren en el sistema
              </p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 rounded-full bg-gray-100 inline-block mb-4">
                <Search className="h-16 w-16 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg font-medium">No se encontraron usuarios</p>
              <p className="text-gray-400 text-sm mt-2">
                Intenta ajustar el término de búsqueda
              </p>
            </div>
          ) : (
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Nombre Completo</Table.Head>
                  <Table.Head>Email</Table.Head>
                  <Table.Head>Teléfono</Table.Head>
                  <Table.Head>Tipo de Usuario</Table.Head>
                  <Table.Head className="text-right">Acciones</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filteredUsers.map((user: GetUserSchemaDto) => (
                  <Table.Row key={user.id}>
                    {editingId === user.id ? (
                      <>
                        <Table.Cell>
                          <Input
                            value={editData.name || ""}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            placeholder="Nombre"
                            className="mb-2 focus:border-purple-500 focus:ring-purple-500/20"
                          />
                          <Input
                            value={editData.last_name || ""}
                            onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                            placeholder="Primer Apellido"
                            className="mb-2 focus:border-purple-500 focus:ring-purple-500/20"
                          />
                          <Input
                            value={editData.second_last_name || ""}
                            onChange={(e) => setEditData({ ...editData, second_last_name: e.target.value })}
                            placeholder="Segundo Apellido"
                            className="focus:border-purple-500 focus:ring-purple-500/20"
                          />
                        </Table.Cell>
                        <Table.Cell className="text-gray-600">{user.email}</Table.Cell>
                        <Table.Cell>
                          <Input
                            value={editData.phone || ""}
                            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                            placeholder="Teléfono"
                            className="focus:border-purple-500 focus:ring-purple-500/20"
                          />
                        </Table.Cell>
                        <Table.Cell className="text-gray-600">{user.user_type}</Table.Cell>
                        <Table.Cell>
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="gradient"
                              onClick={handleSaveEdit}
                              disabled={updateUser.isPending}
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Guardar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={handleCancelEdit}
                              disabled={updateUser.isPending}
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancelar
                            </Button>
                          </div>
                        </Table.Cell>
                      </>
                    ) : (
                      <>
                        <Table.Cell className="font-medium text-(--navy-700)">
                          {user.name} {user.last_name} {user.second_last_name || ""}
                        </Table.Cell>
                        <Table.Cell className="text-gray-600">{user.email}</Table.Cell>
                        <Table.Cell className="text-gray-600">{user.phone}</Table.Cell>
                        <Table.Cell className="text-gray-600">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {user.user_type}
                          </span>
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(user)}
                              className="border-blue-500 text-blue-600 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(user.id, `${user.name} ${user.last_name}`)}
                              disabled={deleteUser.isPending}
                              className="border-red-500 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Eliminar
                            </Button>
                          </div>
                        </Table.Cell>
                      </>
                    )}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
        </Card.Content>
      </Card.Root>
        </div>
      </main>
    </div>
  );
}

