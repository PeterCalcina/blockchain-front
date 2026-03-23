import { useQuery } from "@tanstack/react-query";
import { listUsersService } from "../services/user.service";
import { useAuthFetcher } from "../client/fetcher";

export const useListUsers = () => {
  const fetcher = useAuthFetcher();
  const { list } = listUsersService(fetcher);

  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log("👥 [useListUsers] Obteniendo lista de usuarios");
      const users = await list();
      console.log("👥 [useListUsers] Usuarios obtenidos:", users);
      return users;
    },
  });
};

