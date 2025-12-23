import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold font-headline mb-4">Admin Panel</h1>
      <Alert variant="destructive" className="mb-8">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Development Only</AlertTitle>
        <AlertDescription>
          This admin panel is for demonstration purposes. In a production environment, it must be protected by robust authentication and authorization.
        </AlertDescription>
      </Alert>
      {children}
    </div>
  );
}
