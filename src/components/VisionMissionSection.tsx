import { useRef } from "react";
import { Target, Lightbulb, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

import { SectionHeader } from "./SectionHeader";

gsap.registerPlugin(ScrollTrigger);

export function VisionMissionSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".vision-card");

        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-16 bg-background border-b-2 border-black">
            <div className="container">
                <SectionHeader
                    index="03"
                    tag="STRATEGY"
                    title="Strategic"
                    highlight="Objectives"
                    description="The guiding principles and long-term goals that drive our department's excellence and commitment to society."
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-2 border-black">
                    {/* Vision */}
                    <div className="vision-card p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-white hover:bg-accent transition-colors group">
                        <div className="w-16 h-16 border-2 border-black bg-primary flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                            <Lightbulb className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold uppercase mb-4">Vision</h3>
                        <p className="font-mono text-sm leading-relaxed border-t-2 border-dashed border-black pt-4">
                            Create New Frontiers of Knowledge in Quest for Development of The Humane and Just Society.
                        </p>
                    </div>

                    {/* Mission */}
                    <div className="vision-card p-8 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-white hover:bg-accent transition-colors group">
                        <div className="w-16 h-16 border-2 border-black bg-secondary flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                            <Target className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold uppercase mb-4">Mission</h3>
                        <ul className="space-y-3 font-mono text-xs border-t-2 border-dashed border-black pt-4">
                            <li className="flex gap-2">
                                <span className="font-bold">1.</span>
                                <span>To stimulate the academic for promotion of quality of teaching, learning and research.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold">2.</span>
                                <span>To undertake quality-related research studies, consultancy and training programmes.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold">3.</span>
                                <span>To foster global competencies among students and to inculcate value system in them.</span>
                            </li>
                            <li className="flex gap-2">
                                <span className="font-bold">4.</span>
                                <span>To promote the use of state-of-the-art technology and quest for excellence.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quality Policy */}
                    <div className="vision-card p-8 bg-white hover:bg-accent transition-colors group">
                        <div className="w-16 h-16 border-2 border-black bg-white flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                            <ShieldCheck className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold uppercase mb-4">Quality Policy</h3>
                        <div className="font-mono text-xs border-t-2 border-dashed border-black pt-4">
                            <p className="mb-2 font-bold uppercase">Andhra University is committed to achieving excellence in teaching, research and consultancy:</p>
                            <ul className="space-y-1 ml-4 list-disc">
                                <li>By imparting globally focused education</li>
                                <li>By creating world class professionals</li>
                                <li>By establishing synergic relationships with industry and society</li>
                                <li>By developing state-of-the-art infrastructure and well-endowed faculty</li>
                                <li>By imparting knowledge through team work and incessant efforts</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
