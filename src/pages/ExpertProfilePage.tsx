import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Globe, Youtube, Twitter } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { VideoEmbed } from '@/components/VideoEmbed';
import { NotFound } from './NotFound';
import { getExpertBySlug, type ExpertCategory } from '@/data/experts';

type Tab = 'knowledge' | 'videos';

const CATEGORY_STYLES: Record<ExpertCategory, string> = {
  disclosure: 'bg-alert-deep/30 text-alert border border-alert/50',
  testimony: 'bg-cosmic-dark/30 text-cosmic-bright border border-cosmic/50',
  research: 'bg-mystic-deep/30 text-mystic-light border border-mystic/50',
  theory: 'bg-sacred-dark/30 text-sacred-light border border-sacred/50',
};

export function ExpertProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const expert = slug ? getExpertBySlug(slug) : undefined;
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTab: Tab = searchParams.get('tab') === 'videos' ? 'videos' : 'knowledge';
  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (activeTab === 'knowledge') next.delete('tab');
    else next.set('tab', activeTab);
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  if (!expert) return <NotFound />;

  const portrait = !imgFailed && expert.image ? expert.image : '/placeholder.svg';

  return (
    <div className="min-h-screen bg-cosmic-gradient">
      <SEO
        title={`${expert.name} — ${expert.title} | Pantheon Observatory`}
        description={expert.bio.slice(0, 155)}
        canonical={`/experts/${expert.slug}`}
      />

      {/* Hero */}
      <div className="relative h-80 md:h-96 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${portrait})`,
            filter: 'brightness(0.35) blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-navy/80 to-space-black" />

        <div className="relative h-full flex items-end p-6 md:p-8">
          <div className="max-w-6xl mx-auto w-full">
            <Link
              to="/experts"
              className="inline-flex items-center gap-1.5 text-clarity-silver/80 hover:text-sacred-light text-xs uppercase tracking-[2px] mb-4 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> All Voices
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={portrait}
                alt={expert.name}
                onError={() => setImgFailed(true)}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-sacred-light shadow-neon-green object-cover bg-space-navy"
              />
              <div className="flex-1 sm:pb-2">
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-sacred-light mb-2 drop-shadow-[0_0_20px_rgba(0,255,136,0.6)]"
                >
                  {expert.name}
                </motion.h1>
                <p className="text-lg sm:text-xl md:text-2xl text-cosmic-bright mb-3">
                  {expert.title}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {expert.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-mystic-deep/40 text-clarity-silver text-xs sm:text-sm rounded-full border border-mystic/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-12">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-10 p-6 bg-space-blue/30 backdrop-blur-sm rounded-2xl border border-mystic/30"
        >
          <h2 className="text-2xl font-bold text-sacred mb-4">About</h2>
          <p className="text-clarity-silver leading-relaxed text-base md:text-lg">
            {expert.bio}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 sm:gap-4 mb-8 border-b border-mystic/30 overflow-x-auto">
          <TabButton
            active={activeTab === 'knowledge'}
            color="sacred-light"
            shadow="shadow-neon-green"
            onClick={() => setActiveTab('knowledge')}
          >
            Knowledge ({expert.knowledge.length})
          </TabButton>
          <TabButton
            active={activeTab === 'videos'}
            color="cosmic-bright"
            shadow="shadow-neon-blue"
            onClick={() => setActiveTab('videos')}
          >
            Videos ({expert.videos.length})
          </TabButton>
        </div>

        {/* Knowledge tab */}
        {activeTab === 'knowledge' && (
          <div className="space-y-4">
            {expert.knowledge.length === 0 && (
              <p className="text-clarity-gray text-sm italic">
                No knowledge entries yet.
              </p>
            )}
            {expert.knowledge.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="p-6 bg-space-blue/20 backdrop-blur-sm rounded-xl border border-mystic/20 hover:border-sacred/50 transition-all group"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${CATEGORY_STYLES[item.category]}`}
                  >
                    {item.category}
                  </span>
                  {item.date && (
                    <span className="text-clarity-gray text-sm shrink-0">{item.date}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-sacred-light mb-2 group-hover:text-sacred-glow transition-colors">
                  {item.title}
                </h3>
                <p className="text-clarity-silver leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Videos tab */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expert.videos.length === 0 && (
              <p className="text-clarity-gray text-sm italic md:col-span-2">
                No videos linked yet.
              </p>
            )}
            {expert.videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-space-blue/20 backdrop-blur-sm rounded-xl border border-cosmic/30 overflow-hidden hover:border-cosmic-bright/50 transition-all"
              >
                <VideoEmbed video={video} />
                <div className="p-4">
                  <h4 className="text-sacred font-semibold">{video.title}</h4>
                  <p className="text-clarity-gray text-xs mt-1 capitalize">
                    {video.platform}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Social */}
        {expert.socialLinks && Object.values(expert.socialLinks).some(Boolean) && (
          <div className="mt-12 p-6 bg-purple-green rounded-2xl border border-mystic/30">
            <h3 className="text-xl font-bold text-sacred-light mb-4">
              Follow {expert.name.split(' ')[0]}
            </h3>
            <div className="flex gap-3 flex-wrap">
              {expert.socialLinks.youtube && (
                <SocialButton href={expert.socialLinks.youtube} icon={Youtube} label="YouTube" />
              )}
              {expert.socialLinks.tiktok && (
                <SocialButton href={expert.socialLinks.tiktok} icon={ExternalLink} label="TikTok" />
              )}
              {expert.socialLinks.twitter && (
                <SocialButton href={expert.socialLinks.twitter} icon={Twitter} label="Twitter / X" />
              )}
              {expert.socialLinks.website && (
                <SocialButton href={expert.socialLinks.website} icon={Globe} label="Website" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  color,
  shadow,
  onClick,
  children,
}: {
  active: boolean;
  color: string;
  shadow: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 sm:px-6 py-3 font-semibold text-sm sm:text-base transition-all whitespace-nowrap ${
        active
          ? `text-${color} border-b-2 border-${color} ${shadow}`
          : 'text-clarity-gray hover:text-clarity-silver'
      }`}
    >
      {children}
    </button>
  );
}

function SocialButton({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-space-navy/80 rounded-lg text-clarity-silver font-semibold hover:text-sacred-light hover:bg-space-navy transition-all border border-mystic/40 hover:border-sacred/50 hover:shadow-neon-green"
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}
