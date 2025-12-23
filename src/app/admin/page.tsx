import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Edit, StarOff } from "lucide-react";

export default function AdminPage() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6">
        <AdminCard 
          title="Moderate Reviews"
          description="Approve or reject reviews flagged by users or AI."
          href="/admin/reviews"
          icon={<StarOff className="w-8 h-8 text-accent"/>}
        />
        <AdminCard 
          title="Manage Products"
          description="Add, edit, or update product details and scores."
          href="#"
          icon={<Edit className="w-8 h-8 text-accent"/>}
          disabled
        />
      </div>
    </div>
  );
}

function AdminCard({title, description, href, icon, disabled = false}: {title: string, description: string, href: string, icon: React.ReactNode, disabled?: boolean}) {
    return (
         <Card className={disabled ? "bg-muted" : ""}>
          <CardHeader>
            <div className="flex items-start justify-between">
                <div>
                    <CardTitle className="mb-1">{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                {icon}
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild disabled={disabled}>
              <Link href={href}>
                Go to {title} <ArrowRight className="w-4 h-4 ml-2"/>
              </Link>
            </Button>
          </CardContent>
        </Card>
    )
}
