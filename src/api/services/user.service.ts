import type { CreateUserSchemaDto, GetUserSchemaDto, UpdateUserSchema } from "@/shared/schemas/user.schema";
import { API_ENDPOINTS } from "../endpoints";
import type { useAuthFetcher } from "../client/fetcher";

export const createUserService = (
  fetcher: ReturnType<typeof useAuthFetcher>
) => ({
  create: (user: CreateUserSchemaDto) =>
    fetcher<GetUserSchemaDto>(API_ENDPOINTS.auth.createUser, {
      method: "POST",
      body: JSON.stringify(user),
    }),
});

export const listUsersService = (
  fetcher: ReturnType<typeof useAuthFetcher>
) => ({
  list: () =>
    fetcher<GetUserSchemaDto[]>(API_ENDPOINTS.auth.listUsers, {
      method: "GET",
    }).then(response => response.content),
});

export const updateUserService = (
  fetcher: ReturnType<typeof useAuthFetcher>
) => ({
  update: (id: string, user: UpdateUserSchema) =>
    fetcher<GetUserSchemaDto>(API_ENDPOINTS.auth.updateUser(id), {
      method: "PUT",
      body: JSON.stringify(user),
    }),
});

export const deleteUserService = (
  fetcher: ReturnType<typeof useAuthFetcher>
) => ({
  delete: (id: string) =>
    fetcher<void>(API_ENDPOINTS.auth.deleteUser(id), {
      method: "DELETE",
    }),
});