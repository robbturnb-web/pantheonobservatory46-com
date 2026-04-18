import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Radio, ArrowRight } from 'lucide-react';
import { VideoEmbed } from './VideoEmbed';
import { getVideosByTopic, getMixedVideos, type Topic } from '@/data/frequencies';

interface VideoStripProps {
  topic?: Topic;
  limit?: number;
  title?: string;
  subtitle?: string;
}

export function VideoStrip({ topic, limit = 3, title, subtitle }: VideoStripProps) {
  const videos = topic ? getVideosByTopic(topic, limit) : getMixedVideos(limit);

  if (videos.length === 0) return null;

  const heading = title ?? (topic ? `Latest on ${topic}` : 'Latest Transmissions');

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[3px] text-accent-neon mb-2">
              <Radio className="w-3.5 h-3.5" /> Frequencies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{heading}</h2>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <Link
            to="/frequencies"
            className="text-sm text-primary hover:text-accent-neon transition-colors inline-flex items-center gap-1"
          >
            See all creators <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos.map((v, i) => (
            <motion.div
              key={`${v.creatorId}-${v.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-cosmic rounded-xl overflow-hidden p-3"
            >
              <VideoEmbed video={{ platform: v.platform, id: v.id, title: v.title }} />
              <div className="pt-3 px-1">
                <p className="text-xs text-muted-foreground">{v.creatorName}</p>
                <p className="text-sm text-foreground font-medium line-clamp-2">{v.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
