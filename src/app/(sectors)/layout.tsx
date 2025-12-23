import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SectorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto">
        {children}
    </div>
  );
}
