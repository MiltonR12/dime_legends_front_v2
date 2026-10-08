import { useState } from "react";
import {
  getNodesBounds,
  getViewportForBounds,
  useReactFlow,
} from "@xyflow/react";
import { toPng } from "html-to-image";
import { Download, Link as LinkIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomToast } from "@/lib/handleToast";

const MAX_SIDE = 4096;
const MIN_SIDE = 800;
const BACKGROUND = "#0b0b14";
// El CDN de las fotos no permite leerlas desde aquí. Si una imagen falla, se usa este recuadro.
const IMAGE_FALLBACK =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="64" height="64" fill="#3b2f66"/></svg>',
  );

type Props = {
  tournamentId: string;
  disabled?: boolean;
};

/** Descarga el bracket como imagen y comparte el enlace público del torneo. */
function BracketShare({ tournamentId, disabled = false }: Props) {
  const { getNodes } = useReactFlow();
  const [exporting, setExporting] = useState(false);

  const download = async () => {
    const nodes = getNodes();
    const viewport = document.querySelector<HTMLElement>(
      ".react-flow__viewport",
    );
    if (nodes.length === 0 || !viewport) return;

    setExporting(true);
    try {
      const bounds = getNodesBounds(nodes);
      const padding = 80;
      const width = Math.min(
        MAX_SIDE,
        Math.max(MIN_SIDE, Math.round(bounds.width + padding * 2)),
      );
      const height = Math.min(
        MAX_SIDE,
        Math.max(MIN_SIDE / 2, Math.round(bounds.height + padding * 2)),
      );
      const { x, y, zoom } = getViewportForBounds(
        bounds,
        width,
        height,
        0.1,
        2,
        0.1,
      );

      const dataUrl = await toPng(viewport, {
        backgroundColor: BACKGROUND,
        width,
        height,
        pixelRatio: 1,
        skipFonts: true,
        imagePlaceholder: IMAGE_FALLBACK,
        onImageErrorHandler: () => undefined,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${x}px, ${y}px) scale(${zoom})`,
        },
      });

      const link = document.createElement("a");
      link.download = `bracket-${tournamentId}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      CustomToast.error("No se pudo generar la imagen del bracket");
    } finally {
      setExporting(false);
    }
  };

  const share = async () => {
    const url = `${window.location.origin}/torneo/${tournamentId}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Bracket del torneo", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      CustomToast.info("Enlace del torneo copiado");
    } catch (error) {
      // Cancelar el menú de compartir no es un error.
      if (error instanceof DOMException && error.name === "AbortError") return;
      CustomToast.error("No se pudo compartir el enlace");
    }
  };

  return (
    <>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled={disabled || exporting}
        onClick={download}
        aria-label="Descargar bracket como imagen"
        title="Descargar imagen"
        className="text-admin-text hover:bg-white/5"
      >
        {exporting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={share}
        aria-label="Compartir enlace del torneo"
        title="Compartir enlace"
        className="text-admin-text hover:bg-white/5"
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
    </>
  );
}

export default BracketShare;
