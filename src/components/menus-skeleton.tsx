import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function MenusSkeleton() {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl space-y-4 text-center mb-12">
        <Skeleton className="h-4 w-24 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i} className="h-full border-brand-secondary/50">
            <CardHeader className="border-b border-brand-secondary/30 bg-gradient-to-br from-brand-light/50 to-white">
              <Skeleton className="h-8 w-32" />
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {[1, 2, 3, 4].map((j) => (
                <div
                  key={j}
                  className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="text-right space-y-2">
                    <Skeleton className="h-7 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

