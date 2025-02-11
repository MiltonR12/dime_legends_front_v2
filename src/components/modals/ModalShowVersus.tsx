'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from '../ui/Image';

interface Team {
  _id: string;
  name: string;
  image?: string | null;
}

interface BattlePreviewProps {
  battle: {
    date: string;
    hour: string;
    teamOne: Team | null;
    teamTwo: Team | null;
  };
}

function ModalShowVersus({ battle }: BattlePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!contentRef.current) return;

    try {
      const canvas = await html2canvas(contentRef.current, {
        backgroundColor: null,
        useCORS: true,
      });

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `battle-${battle.date}.png`;
      link.href = image;
      link.click();
      URL.revokeObjectURL(image);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Generar Imagen</Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl bg-fondo">
        <DialogHeader>
          <DialogTitle>Previsualización del Versus</DialogTitle>
        </DialogHeader>

        <div ref={contentRef} className="bg-gradient-to-br from-fondo to-gray-900 p-6 rounded-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-400 uppercase tracking-wide">Versus</h2>
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center mb-6">
            <TeamPreview team={battle.teamOne} />
            <div className="text-7xl font-bold text-red-500 mx-8">VS</div>
            <TeamPreview team={battle.teamTwo} />
          </div>

          <div className="flex justify-center items-center gap-4 text-gray-300">
            <div className="flex items-center capitalize">
              <span>{new Date(battle.date).toLocaleDateString('es', {
                month: 'long',
                day: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: 'numeric',
              })}</span>
            </div>
          </div>
        </div>

        <Button onClick={handleDownload} className="mt-4">
          Descargar Imagen
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function TeamPreview({ team }: { team: Team | null }) {

  if (!team) {
    return (
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No team</span>
        </div>
        <span className="text-lg font-semibold text-gray-400">TBD</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-32 h-32 relative rounded-full bg-white">
        <Image
          src={team.image}
          className="w-full h-full object-contain rounded-full"
        />
      </div>
      <span className="text-lg line-clamp-1 font-semibold text-center text-white">
        {team.name}
      </span>
    </div>
  );
}

export default ModalShowVersus;