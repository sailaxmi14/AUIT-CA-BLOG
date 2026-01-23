import { leadershipData } from "@/data/facultyData";
import { Crown, User, Calendar } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SectionHeader } from "./SectionHeader";

export function LeadershipSection() {
  const currentHod = leadershipData.find((leader) => leader.isCurrent);
  const previousHods = leadershipData.filter((leader) => !leader.isCurrent);

  return (
    <section id="leadership" className="pb-20 pt-8 md:pb-28 md:pt-12 bg-background bauhaus-grid">
      <div className="container">

        <SectionHeader
          index="01"
          tag="GOVERNANCE"
          title="Department"
          highlight="Leadership"
          description="Guided by distinguished academicians with proven expertise in administration and research."
        />

        {/* Current HOD - Prominent display */}
        {currentHod && (
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10">
                <span className="inline-flex items-center gap-2 px-6 py-2 border-2 border-black bg-accent text-black font-heading font-bold uppercase text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Crown className="w-4 h-4" />
                  Current Head
                </span>
              </div>

              <Card className="border-2 border-black bg-white">
                <CardHeader className="flex flex-col items-center text-center pb-6 pt-12 border-b-2 border-black bg-white">
                  <div className="w-24 h-24 border-2 border-black bg-accent/20 flex items-center justify-center mb-4 rounded-full">
                    <User className="w-12 h-12 text-black" />
                  </div>
                  <CardTitle className="text-3xl mb-2">{currentHod.name}</CardTitle>
                  <CardDescription className="text-base text-muted-foreground font-bold">
                    {currentHod.designation}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-6">
                  <div className="inline-flex items-center gap-2 font-mono text-sm border-2 border-black px-4 py-2 bg-background">
                    <Calendar className="w-4 h-4" />
                    <span>Tenure: {currentHod.tenure}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Previous HODs */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl font-bold uppercase text-center mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-black"></span>
            Previous Heads
            <span className="h-px w-12 bg-black"></span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previousHods.map((leader) => (
              <Card key={leader.name} className="group hover:-translate-y-1 transition-transform">
                <CardHeader className="flex flex-row items-center gap-4 pb-4 border-b-2 border-black bg-background/50">
                  <div className="w-12 h-12 border-2 border-black bg-muted flex items-center justify-center shrink-0 rounded-full">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{leader.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {/* @ts-ignore */}
                      {leader.role || "HEAD OF DEPARTMENT"}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-muted/30 p-2 border border-black/10">
                    <Calendar className="w-3 h-3" />
                    <span>TENURE: {leader.tenure}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
