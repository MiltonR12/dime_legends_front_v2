import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Crown, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "@/components/ui/Image";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizers } from "@/hooks/page";
import type { OrganizerSummary } from "@/app/api/page/pageApi";

const SKELETONS = [0, 1, 2, 3];

function OrganizerCard({
  organizer,
  index,
}: {
  organizer: OrganizerSummary;
  index: number;
}) {
  const count = organizer.tournaments;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index, 7) * 0.05 }}
    >
      <Link
        to={`/organizador/${organizer._id}`}
        className="group block overflow-hidden rounded-2xl border border-purple-800/50 bg-purple-900/20 backdrop-blur-sm transition hover:border-pink-500/60 hover:bg-purple-900/40"
      >
        <div className="relative h-24 bg-gradient-to-br from-purple-700/60 to-pink-700/40">
          {organizer.banner ? (
            <img
              src={organizer.banner}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="px-4 pb-4">
          <Image
            src={organizer.image}
            alt={organizer.name}
            noImage={organizer.name.slice(0, 2).toUpperCase()}
            className="-mt-8 h-16 w-16 border-4 border-purple-950"
          />
          <h3 className="mt-2 truncate text-lg font-bold text-white group-hover:text-pink-300">
            {organizer.name}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-10 text-sm text-purple-300">
            {organizer.description || "Organizador de torneos en Dime Legends"}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-purple-200">
            <Trophy className="h-3.5 w-3.5 text-pink-400" />
            {count} {count === 1 ? "torneo publicado" : "torneos publicados"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function OrganizersSection() {
  const { data, isLoading, isError } = useOrganizers();

  // Sin organizadores aprobados o si falla la carga no hay nada que mostrar.
  if (isError || (!isLoading && (!data || data.length === 0))) return null;

  return (
    <section className="px-4 py-20">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <Badge className="mb-4 bg-pink-600/80 px-4 py-1.5 text-white hover:bg-pink-600">
            <Crown className="mr-1.5 h-4 w-4" /> ORGANIZADORES
          </Badge>
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Quienes hacen los <span className="text-pink-500">torneos</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-purple-300">
            Conoce a los organizadores de la comunidad y entra a su página para
            ver sus torneos.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading
            ? SKELETONS.map((key) => (
                <Skeleton
                  key={key}
                  className="h-56 rounded-2xl bg-purple-900/30"
                />
              ))
            : data?.map((organizer, index) => (
                <OrganizerCard
                  key={organizer._id}
                  organizer={organizer}
                  index={index}
                />
              ))}
        </div>
      </div>
    </section>
  );
}

export default OrganizersSection;
