import { motion } from 'framer-motion';
import CastCard from './CastCard';
import type { CastSectionProps } from '@/types/movie';

export function CastSection({ cast }: CastSectionProps) {
  // Show top 6 cast members
  const displayCast = cast.slice(0, 6);

  if (!displayCast.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="pb-40"
    >
      <h2 className="text-neutral-25 font-bold md:text-size-display-md md:-tracking-1  mb-6">
        Cast &amp; Crew
      </h2>

      {/* Grid: 3 columns desktop, 1 column mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {displayCast.map((member, i) => (
          <CastCard key={member.credit_id ?? member.id} member={member} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
