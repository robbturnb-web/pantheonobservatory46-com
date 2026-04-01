import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Clock, FileSearch, Sparkles, Brain, Radio, Compass, MessageCircle } from 'lucide-react';

const sections = [
  { to: '/timeline', icon: Clock, title: 'Timeline', desc: 'Ancient to modern cosmic history' },
  { to: '/uap', icon: FileSearch, title: 'UAP Files', desc: 'Documented encounters & disclosure' },
  { to: '/gods', icon: Sparkles, title: 'Gods & Archetypes', desc: 'Mythological intelligence across pantheons' },
  { to: '/consciousness', icon: Brain, title: 'Consciousness', desc: 'Stargate, Gateway Process & beyond' },
  { to: '/signals', icon: Radio, title: 'Signal Watch', desc: 'Researcher credibility ratings' },
  { to: '/origin', icon: Compass, title: 'Origin Chamber', desc: 'Discover your starseed archetype' },
  { to: '/echo', icon: MessageCircle, title: 'Echo AI', desc: 'Ask the cosmic intelligence' },
];

export function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="flex justify-center mb-6">
          <Eye className="w-16 h-16 text-primary cosmic-float" />
        </div>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
          <span className="text-foreground">PANTHEON</span>
          <br />
          <span className="text-primary">OBSERVATORY</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A knowledge platform exploring UAPs, ancient mysteries, consciousness research,
          and the cosmic questions humanity has asked since the beginning.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              to={section.to}
              className="block glass-cosmic rounded-xl p-6 transition-all hover:scale-[1.02] group"
            >
              <section.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-lg font-bold text-foreground mb-2">{section.title}</h2>
              <p className="text-sm text-muted-foreground">{section.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
