import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { milestones } from "@/lib/milestones";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-semibold tracking-tight">VERA</h1>
          <p className="hidden text-sm text-muted-foreground md:block">
            Your AI guide through buying your first home in NSW.
          </p>
        </div>
        <p className="px-6 pb-5 text-sm text-muted-foreground md:hidden">
          Your AI guide through buying your first home in NSW.
        </p>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-8 md:py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold tracking-tight">First Home Buyer Milestones</h2>
          <p className="mt-2 text-muted-foreground">
            Follow each milestone from getting finance ready to settlement day.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {milestones.map((milestone) => (
            <Card key={milestone.id} className="h-full">
              <CardHeader>
                <CardDescription>Step {milestone.order}</CardDescription>
                <CardTitle>{milestone.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{milestone.shortDescription}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/milestones/${milestone.id}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  Learn more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
