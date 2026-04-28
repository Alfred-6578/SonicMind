import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const { isAuthed, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && !isAuthed) router.replace(redirectTo);
  }, [isLoading, isAuthed, redirectTo, router]);
  return { isAuthed, isLoading };
}

export function useRedirectIfAuthed(redirectTo = "/admin") {
  const router = useRouter();
  const { isAuthed, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && isAuthed) router.replace(redirectTo);
  }, [isLoading, isAuthed, redirectTo, router]);
  return { isAuthed, isLoading };
}
