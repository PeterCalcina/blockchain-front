/**
 * Mock data for user endpoints
 */

export interface MockUser {
  id: string;
  email: string;
  name: string;
  last_name: string;
  second_last_name: string;
  phone: string;
  user_type: "admin" | "user" | "notary" | "guest";
  created_at?: string;
  updated_at?: string;
}

const mockUsers: MockUser[] = [
  {
    id: "660000000000000000000001",
    email: "juan.perez@example.com",
    name: "Juan",
    last_name: "Pérez",
    second_last_name: "García",
    phone: "+34 912 345 678",
    user_type: "admin",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-03-17T14:22:00Z"
  },
  {
    id: "660000000000000000000002",
    email: "maria.lopez@example.com",
    name: "María",
    last_name: "López",
    second_last_name: "Rodríguez",
    phone: "+34 912 345 679",
    user_type: "notary",
    created_at: "2024-01-20T08:15:00Z",
    updated_at: "2024-03-16T11:45:00Z"
  },
  {
    id: "660000000000000000000003",
    email: "carlos.martinez@example.com",
    name: "Carlos",
    last_name: "Martínez",
    second_last_name: "Fernández",
    phone: "+34 912 345 680",
    user_type: "user",
    created_at: "2024-02-01T09:00:00Z",
    updated_at: "2024-03-10T16:30:00Z"
  },
  {
    id: "660000000000000000000004",
    email: "ana.sanchez@example.com",
    name: "Ana",
    last_name: "Sánchez",
    second_last_name: "Moreno",
    phone: "+34 912 345 681",
    user_type: "user",
    created_at: "2024-02-10T14:20:00Z",
    updated_at: "2024-03-14T10:15:00Z"
  },
  {
    id: "660000000000000000000005",
    email: "diego.torres@example.com",
    name: "Diego",
    last_name: "Torres",
    second_last_name: "Jiménez",
    phone: "+34 912 345 682",
    user_type: "notary",
    created_at: "2024-02-28T11:00:00Z",
    updated_at: "2024-03-17T09:30:00Z"
  }
];

export const usersMockData = {
  // List users response
  listUsersResponse: {
    content: mockUsers,
    status_code: 200
  },

  // Get single user response
  getUserResponse: (id: string) => ({
    content: mockUsers.find(u => u.id === id) || mockUsers[0],
    status_code: 200
  }),

  // Create user response
  createUserResponse: {
    content: {
      id: "660000000000000000000006",
      email: "new.user@example.com",
      name: "Nuevo",
      last_name: "Usuario",
      second_last_name: "Prueba",
      phone: "+34 912 345 683",
      user_type: "user",
      created_at: "2024-03-17T15:00:00Z"
    },
    status_code: 201
  },

  // Update user response
  updateUserResponse: {
    content: {
      id: "660000000000000000000001",
      email: "juan.perez.updated@example.com",
      name: "Juan",
      last_name: "Pérez",
      second_last_name: "García",
      phone: "+34 912 999 999",
      user_type: "admin",
      updated_at: "2024-03-17T15:30:00Z"
    },
    status_code: 200
  },

  // Delete user response
  deleteUserResponse: {
    content: {
      message: "Usuario eliminado correctamente",
      id: "660000000000000000000003"
    },
    status_code: 200
  },

  // Error responses
  userNotFoundResponse: {
    content: {
      message: "El usuario no fue encontrado"
    },
    status_code: 404
  },

  userAlreadyExistsResponse: {
    content: {
      message: "El email ya está registrado"
    },
    status_code: 409
  }
};
