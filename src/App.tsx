import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { 
  Mail, 
  Linkedin, 
  Github, 
  ChevronLeft,
  ChevronRight, 
  ArrowUpRight, 
  Download, 
  MapPin, 
  Calendar,
  Briefcase,
  GraduationCap,
  LayoutDashboard,
  BarChart3,
  Settings,
  Users
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { RESUME_DATA } from "./constants";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-10"
  >
    <h2 className="text-3xl md:text-4xl font-serif mb-3">{title}</h2>
    {subtitle && <p className="text-stone-500 max-w-2xl text-sm">{subtitle}</p>}
    <div className="h-px w-16 bg-gold-400 mt-4" />
  </motion.div>
);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("hero");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTIONS.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollProjects = (direction: "left" | "right") => {
    if (projectsRef.current) {
      const scrollAmount = projectsRef.current.clientWidth * 0.8;
      projectsRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Progress Bar (Top) */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gold-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pointer-events-auto"
        >
          <a href="#hero" className="font-serif text-xl tracking-tighter">LL.</a>
        </motion.div>
      </nav>

      {/* Vertical Progress Navigation (Right) */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-end">
        {SECTIONS.map((section) => (
          <a 
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-4 focus:outline-none"
          >
            <span className={`
              text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300
              ${activeSection === section.id ? "opacity-100 translate-x-0 text-gold-400" : "opacity-0 translate-x-4 group-hover:opacity-60 group-hover:translate-x-0 text-stone-400"}
              hidden md:block
            `}>
              {section.label}
            </span>
            <div className={`
              w-2 h-2 rounded-full transition-all duration-500 border
              ${activeSection === section.id ? "bg-gold-400 border-gold-400 scale-125" : "bg-transparent border-stone-300 group-hover:border-gold-400"}
            `} />
          </a>
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="min-h-[80vh] flex flex-col justify-center px-6 md:px-24 pt-16">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-gold-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">
              Strategic Operational Analyst
            </span>
            <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] mb-6 tracking-tighter">
              {RESUME_DATA.name}
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col md:flex-row md:items-end gap-12"
          >
            <p className="text-xl md:text-2xl text-stone-500 max-w-xl leading-relaxed font-light italic">
              "{RESUME_DATA.intro}"
            </p>
            
            <div className="flex gap-4">
              <a 
                href="#experience" 
                className="px-8 py-4 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-gold-400 transition-all duration-300 flex items-center gap-2 group"
              >
                View Experience
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 border border-stone-900/20 rounded-full text-sm font-medium hover:border-stone-900 transition-all duration-300"
              >
                Contact
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-stone-300"
        >
          <div className="w-px h-12 bg-current mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 md:px-24 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-[16/9] md:aspect-[4/5] bg-stone-100 rounded-2xl overflow-hidden"
          >
            <img 
              src="https://picsum.photos/seed/cityscape_main/800/1000" 
              alt="Cityscape" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/10" />
          </motion.div>

          <div>
            <SectionHeader 
              title="Analytical Mindset" 
              subtitle="Bridging the gap between operational needs and data-driven solutions."
            />
            <div className="space-y-6 text-lg text-stone-600 leading-relaxed font-light">
              <p>{RESUME_DATA.about}</p>
              <p>
                My approach combines quantitative rigor with strategic insight, ensuring that every dashboard, report, and process improvement serves a clear business objective.
              </p>
            </div>

            <div className="space-y-12 mt-12">
              <div>
                <h4 className="font-serif text-xl mb-6">Education</h4>
                <div className="space-y-6">
                  {RESUME_DATA.education.map((edu, idx) => (
                    <div key={idx} className="flex gap-4 items-start group/edu">
                      {edu.logo && (
                        <a 
                          href={edu.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl bg-stone-50 border border-stone-100 flex-shrink-0 flex items-center justify-center p-2 group-hover/edu:border-gold-400 transition-colors overflow-hidden"
                        >
                          <img 
                            src={edu.logo} 
                            alt={edu.school} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </a>
                      )}
                      <div>
                        <a 
                          href={edu.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-semibold hover:text-gold-400 transition-colors block"
                        >
                          {edu.school}
                        </a>
                        <p className="text-xs text-stone-500 italic">{edu.degree}</p>
                        <p className="text-[10px] text-stone-400 mt-1">{edu.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-4">Focus Areas</h4>
                <ul className="text-sm grid grid-cols-2 gap-2 text-stone-500">
                  <li>• Business Analysis</li>
                  <li>• Process Automation</li>
                  <li>• Stakeholder Management</li>
                  <li>• Data Visualisation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 md:px-24">
        <div className="max-w-5xl mx-auto">
          <SectionHeader 
            title="Professional Journey" 
            subtitle="A track record of driving efficiency and clarity across diverse industries."
          />

          <div className="space-y-12">
            {RESUME_DATA.experience.map((exp, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative grid md:grid-cols-[1fr_2.5fr] gap-6 md:gap-12"
              >
                <div>
                  <div className="sticky top-24">
                    <span className="text-gold-400 font-mono text-xs mb-2 block">{exp.period}</span>
                    <div className="flex items-center gap-3 mb-3">
                      {exp.logo && (
                        <a 
                          href={exp.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-xl bg-white border border-stone-100 flex items-center justify-center p-2 shadow-sm hover:border-gold-400 transition-all overflow-hidden"
                        >
                          <img 
                            src={exp.logo} 
                            alt={exp.company} 
                            className="w-full h-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </a>
                      )}
                      <div>
                        <a 
                          href={exp.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xl font-serif hover:text-gold-400 transition-colors block"
                        >
                          {exp.company}
                        </a>
                        <p className="text-stone-500 text-xs flex items-center gap-1">
                          <MapPin size={12} /> {exp.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-500 border border-stone-100">
                  <h4 className="text-lg font-medium mb-4 flex items-center gap-3">
                    <Briefcase size={18} className="text-gold-400" />
                    {exp.role}
                  </h4>
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-3 text-stone-600 text-sm leading-relaxed font-light">
                        <span className="text-gold-400 mt-1.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <section id="projects" className="py-20 bg-stone-900 text-white overflow-hidden">
        <div className="px-6 md:px-24 mb-10 flex justify-between items-end">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-serif mb-3">Featured Projects</h2>
            <p className="text-stone-400 max-w-xl text-sm">Visualising complex data through intuitive dashboards and strategic frameworks.</p>
          </motion.div>

          <div className="hidden md:flex gap-4">
            <button 
              onClick={() => scrollProjects("left")}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all duration-300"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scrollProjects("right")}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-stone-900 transition-all duration-300"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div 
          ref={projectsRef}
          className="flex gap-8 px-6 md:px-24 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory touch-pan-x"
        >
          {RESUME_DATA.projects.map((project, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="min-w-[85vw] md:min-w-[450px] snap-center"
            >
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative group">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-900/40 group-hover:bg-stone-900/20 transition-all duration-500" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-serif mb-2">{project.title}</h3>
              <p className="text-stone-400 text-sm mb-4 font-light line-clamp-2">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full text-stone-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Capabilities" 
            subtitle="A specialised toolkit for modern business intelligence and operational excellence."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {RESUME_DATA.skills.map((group, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-stone-100 hover:border-gold-400/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center mb-4 text-gold-400">
                  {idx === 0 && <Users size={20} />}
                  {idx === 1 && <BarChart3 size={20} />}
                  {idx === 2 && <Settings size={20} />}
                </div>
                <h3 className="text-lg font-serif mb-4">{group.category}</h3>
                <ul className="space-y-2">
                  {group.skills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2 text-stone-500 text-xs">
                      <div className="w-1 h-1 rounded-full bg-gold-400" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 md:px-24 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-6">Let's Connect</h2>
            <p className="text-lg text-stone-500 mb-8 font-light">
              Open to discussing strategic opportunities, process improvements, or data-driven collaborations.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a 
                href={`mailto:${RESUME_DATA.contact.email}`}
                className="flex items-center gap-3 text-xl font-serif hover:text-gold-400 transition-colors"
              >
                <Mail className="text-gold-400" />
                {RESUME_DATA.contact.email}
              </a>
            </div>

            <div className="flex justify-center gap-6 mt-16">
              <a href={RESUME_DATA.contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all duration-300">
                <Linkedin size={20} />
              </a>
              {RESUME_DATA.contact.github && (
                <a href={RESUME_DATA.contact.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all duration-300">
                  <Github size={20} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-24 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest text-stone-400">
        <p>© 2026 {RESUME_DATA.name}. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-stone-900 transition-colors">Back to Top</a>
          <p>Designed for Excellence</p>
        </div>
      </footer>
    </div>
  );
}
