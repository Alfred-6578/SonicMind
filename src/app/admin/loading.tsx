import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
