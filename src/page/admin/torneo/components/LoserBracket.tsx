import { getLoserBracketThunk } from '@/app/redux/battle/battleSlice';
import { RootState, useAppDispatch } from '@/app/store';
import CardBracket from '@/components/card/CardBracket';
import { useEffect } from 'react';
import { Bracket } from 'react-brackets';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function LoserBracket() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loserBrackets } = useSelector((state: RootState) => state.battle);

  useEffect(() => {
    if (id) dispatch(getLoserBracketThunk(id));
  }, [id, dispatch]);

  return (
    <Bracket
      rounds={loserBrackets.map((item) => ({
        title: `Ronda ${item.round}`,
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
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          mobileBreakpoint: 768,
        })),
      }))}
      renderSeedComponent={({ seed, seedIndex }) => (
        <CardBracket
          id={seed.id as string}
          tournament={id as string}
          key={seedIndex}
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
  );
}

export default LoserBracket