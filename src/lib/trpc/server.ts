import { appRouter } from "@/server/trpc";
import { createContext } from "@/server/trpc/context";

export const serverClient = appRouter.createCaller(await createContext());
