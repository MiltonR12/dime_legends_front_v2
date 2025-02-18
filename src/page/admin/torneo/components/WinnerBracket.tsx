import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import { getBracketThunk } from '@/app/redux/battle/battleSlice';
import { RootState, useAppDispatch } from '@/app/store';
import CardBracket from '@/components/card/CardBracket';
import { useEffect } from 'react';
import { Bracket } from 'react-brackets';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function WinnerBracket() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { winnerBrackets, loserBrackets } = useSelector((state: RootState) => state.battle);

  const ref = useRef<HTMLDivElement>(null) as React.MutableRefObject<HTMLDivElement>;
  const { events } = useDraggable(ref);

  useEffect(() => {
    if (id) dispatch(getBracketThunk(id));
  }, [id, dispatch]);

  return (
    <div
      ref={ref}
      {...events}
      style={{
        overflow: 'auto',
        cursor: 'grab',
        width: '100%',
        height: '100%',
      }}
    >
      
      <h3 className="text-3xl font-bold text-white text-center pb-5">
        Bracket de Ganadores
      </h3>

      <Bracket
        rounds={winnerBrackets.map((item) => ({
          title: `Winner ${item.round}`,
          seeds: item.battles.map(({ _id, teamOne, teamTwo, date, winner }) => ({
            id: _id,
            teams: [
              {
                name: teamOne?.name || 'Equipo A',
                image: teamOne?.image,
                winner: winner === teamOne?._id,
                id: teamOne?._id,
              },
              {
                name: teamTwo?.name || 'Equipo B',
                image: teamTwo?.image,
                winner: winner === teamTwo?._id,
                id: teamTwo?._id,
              },
            ],
            date: new Date(date).toLocaleString('es', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
        }))}
        renderSeedComponent={({ seed, seedIndex }) => (
          <CardBracket
            id={seed.id as string}
            key={seedIndex}
            date={seed.date}
            position={seedIndex}
            teamOne={{
              name: seed.teams[0].name,
              image: seed.teams[0].image,
              winner: seed.teams[0].winner,
              id: seed.teams[0].id,
            }}
            teamTwo={{
              name: seed.teams[1].name,
              image: seed.teams[1].image,
              winner: seed.teams[1].winner,
              id: seed.teams[1].id,
            }}
          />
        )}
      />

      <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />

      <h3 className="text-3xl font-bold text-white text-center pb-5">
        Bracket de Perdedores
      </h3>

      <Bracket
        rounds={loserBrackets.map((item) => ({
          title: `Loser ${item.round}`,
          seeds: item.battles.map(({ _id, teamOne, teamTwo, date, winner }) => ({
            id: _id,
            teams: [
              {
                name: teamOne?.name || 'Equipo A',
                image: teamOne?.image,
                winner: winner === teamOne?._id,
                id: teamOne?._id,
              },
              {
                name: teamTwo?.name || 'Equipo B',
                image: teamTwo?.image,
                winner: winner === teamTwo?._id,
                id: teamTwo?._id,
              },
            ],
            date: new Date(date).toLocaleString('es', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          })),
        }))}
        renderSeedComponent={({ seed, seedIndex }) => (
          <CardBracket
            id={seed.id as string}
            key={seedIndex}
            position={seedIndex}
            date={seed.date}
            teamOne={{
              name: seed.teams[0].name,
              image: seed.teams[0].image,
              winner: seed.teams[0].winner,
              id: seed.teams[0].id,
            }}
            teamTwo={{
              name: seed.teams[1].name,
              image: seed.teams[1].image,
              winner: seed.teams[1].winner,
              id: seed.teams[1].id,
            }}
          />
        )}
      />
    </div>
  );
}

export default WinnerBracket;