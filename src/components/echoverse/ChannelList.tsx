import { motion } from 'framer-motion';

interface Channel {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

interface ChannelListProps {
  channels: Channel[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}

export function ChannelList({ channels, activeSlug, onSelect }: ChannelListProps) {
  return (
    <div className="space-y-1">
      <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold px-3 mb-2">Channels</h3>
      {channels.map((ch) => (
        <motion.button
          key={ch.id}
          whileHover={{ x: 2 }}
          onClick={() => onSelect(ch.slug)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
            activeSlug === ch.slug
              ? 'bg-primary/20 text-primary font-semibold'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
          }`}
        >
          <span>{ch.icon}</span>
          <span>{ch.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
