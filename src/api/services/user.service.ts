import type { CreateUserSchemaDto, GetUserSchemaDto } from "@/shared/schemas/user.schema";
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