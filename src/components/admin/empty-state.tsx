import { FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = { onUpload: () => void };

export function AdminEmptyState({ onUpload }: Props) {
  return (
    <div className="py-16 text-center">
      <div className="h-14 w-14 rounded-2xl bg-muted mx-auto flex items-center justify-center">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <h2 className="mt-4 text-lg font-semibold">No documents yet</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Upload your first document to start training the chat.
      </p>
      <Button variant="primary" className="mt-5" onClick={onUpload}>
        <Upload className="h-4 w-4" />
        Upload document
      </Button>
    </div>
  );
}
