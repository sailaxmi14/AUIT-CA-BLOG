import { useState, useEffect } from "react";
import { Menu, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "ABOUT", href: "/#about", type: "scroll" },
  { label: "LEADERSHIP", href: "/leadership", type: "route" },
  { label: "FACULTY", href: "/faculty", type: "route" },
  { label: "PROGRAMS", href: "/programs", type: "route" },
  { label: "EVENTS", href: "/events", type: "route" },
  { label: "CONTACT", href: "/#contact", type: "scroll" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string, type: string) => {
    setIsOpen(false);

    if (type === "route") {
      navigate(href);
      window.scrollTo(0, 0);
    } else {
      // Handle scroll type
      if (location.pathname !== "/") {
        navigate("/");
        // Wait for navigation then scroll is tricky, often better to rely on hash router or timeout
        setTimeout(() => {
          const id = href.split("#")[1];
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const id = href.split("#")[1];
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 border-b-2 border-black",
        scrolled
          ? "bg-background/95 backdrop-blur-sm py-2 shadow-[0_2px_0_0_rgba(0,0,0,1)]"
          : "bg-background py-3"
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Branding */}
        <a
          href="/"
          className="flex items-center gap-3 group"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/", "route");
          }}
        >
          <img src="/au-logo.png" alt="Andhra University Logo" className="w-9 h-9 object-contain" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg md:text-xl uppercase tracking-tighter leading-none group-hover:text-primary transition-colors duration-200">ANDHRA UNIVERSITY</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground leading-none mt-0.5">Dept. IT & CA</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "rounded-none border-2 border-transparent hover:border-black hover:bg-accent text-foreground font-bold font-heading tracking-tight transition-all duration-200 text-sm px-3",
                location.pathname === item.href ? "border-black bg-accent" : ""
              )}
              onClick={() => handleNavigation(item.href, item.type)}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-none border-2 border-black hover:bg-accent transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background/98 backdrop-blur-sm border-t-2 border-black z-40 animate-in slide-in-from-top-3 bauhaus-grid">
          <nav className="container py-6 flex flex-col gap-3">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start text-lg font-heading font-bold uppercase border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.9)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.9)] active:shadow-none transition-all duration-200 h-14"
                onClick={() => handleNavigation(item.href, item.type)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
