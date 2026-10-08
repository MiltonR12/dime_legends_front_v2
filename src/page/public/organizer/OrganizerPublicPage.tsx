import { Link, useParams } from "react-router-dom";
import { usePublicPage } from "@/hooks/page";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/lib/pageTitle";

const PHASE_LABEL: Record<string, string> = {
  inscription: "Inscripción",
  running: "En curso",
  finished: "Finalizado",
};

function OrganizerPublicPage() {
  const { id } = useParams();
  const { data: page, isLoading, isError } = usePublicPage(id);
  usePageTitle(page?.name);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-black px-4 py-24 text-center text-purple-300">
        Cargando página...
      </main>
    );
  }

  if (isError || !page) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-center">
        <h1 className="text-3xl font-bold text-white">
          Organizador no encontrado
        </h1>
        <Button
          asChild
          className="mt-6 bg-purple-600 text-white hover:bg-purple-700"
        >
          <Link to="/torneos">Ver torneos</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 to-black text-white">
      <div className="relative h-48 bg-purple-900">
        {page.banner && (
          <img
            src={page.banner}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <div className="-mt-12 flex items-end gap-4">
          {page.image ? (
            <img
              src={page.image}
              alt=""
              className="h-24 w-24 rounded-full border-4 border-black object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-black bg-purple-800 text-2xl">
              {page.name.slice(0, 1)}
            </div>
          )}
          <h1 className="pb-2 text-3xl font-semibold">{page.name}</h1>
        </div>
        {page.description && (
          <p className="mt-4 text-purple-200">{page.description}</p>
        )}
        {page.socialLinks.length > 0 && (
          <ul className="mt-6 space-y-2">
            {page.socialLinks.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-purple-300 hover:underline"
                >
                  {item.platform} · {item.url}
                </a>
              </li>
            ))}
          </ul>
        )}
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-medium">Torneos</h2>
          {page.tournaments.length === 0 ? (
            <p className="text-sm text-purple-300">Todavía no tiene torneos.</p>
          ) : (
            <ul className="divide-y divide-purple-900 rounded-lg border border-purple-800">
              {page.tournaments.map((item) => (
                <li key={item._id}>
                  <Link
                    to={`/torneo/${item._id}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-purple-900/40"
                  >
                    <span>{item.name}</span>
                    <span className="text-sm text-purple-300">
                      {PHASE_LABEL[item.phase ?? "inscription"]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default OrganizerPublicPage;
