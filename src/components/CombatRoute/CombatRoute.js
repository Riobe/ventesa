import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import produce from 'immer';

const CombatRouteContainer = styled.div`
  height: 100%;
  margin: 0 auto;
  display: grid;

  grid-template-columns: 1.4fr 0.6fr 1.3fr 0.7fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: 'players input npcs init';

  & > .players {
    grid-area: players;
  }
  & > .input {
    grid-area: input;
  }
  & > .npcs {
    grid-area: npcs;
  }
  & > .init {
    grid-area: init;
  }
`;

const PlayersContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NpcsContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

function PlayerCard({ player, onChange }) {
  return (
    <div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={player.name}
          onChange={event =>
            onChange({
              ...player,
              name: event.target.value,
            })
          }
        />
      </div>

      <div>
        <label>Attack:</label>
        <input
          type="number"
          value={player.attack}
          onChange={event =>
            onChange({
              ...player,
              attack: event.target.value,
            })
          }
        />
      </div>

      <div>
        <label>Damage:</label>
        <input
          type="number"
          value={player.damage}
          onChange={event =>
            onChange({
              ...player,
              damage: event.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Initiative:</label>
        <input
          type="number"
          onChange={event =>
            onChange({
              ...player,
              initiative: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.object,
  onChange: PropTypes.func,
};

function NpcCard({ npc, onChange }) {
  return (
    <div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          onChange={event =>
            onChange({
              ...npc,
              name: event.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Defense:</label>
        <input
          type="number"
          onChange={event =>
            onChange({
              ...npc,
              defense: event.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Soak:</label>
        <input
          type="number"
          onChange={event =>
            onChange({
              ...npc,
              soak: event.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Initiative:</label>
        <input
          type="number"
          onChange={event =>
            onChange({
              ...npc,
              initiative: event.target.value,
            })
          }
        />
      </div>
    </div>
  );
}

NpcCard.propTypes = {
  npc: PropTypes.object,
  onChange: PropTypes.func,
};

function CombatRoute() {
  const [players, setPlayers] = useState([]);
  // const [currentPlayer, setCurrentPlayer] = useState();
  const [npcs, setNpcs] = useState([]);
  // const [currentNpc, setCurrentNpc] = useState();
  const [damagePool /* , setDamagePool */] = useState(0);

  const addPlayer = () => {
    setPlayers(
      produce(draftPlayers => {
        draftPlayers.push({
          name: '',
          attack: 0,
          damage: 0,
          init: 0,
        });
      }),
    );
  };

  const addNpc = () => {
    setNpcs(
      produce(draftNpcs => {
        draftNpcs.push({
          name: '',
          defense: 0,
          soak: 0,
          init: 0,
        });
      }),
    );
  };

  return (
    <CombatRouteContainer>
      <PlayersContainer className="players">
        <button onClick={addPlayer}>+</button>
        {players.map((player, i) => (
          <PlayerCard
            player={player}
            key={i}
            onChange={updatedPlayer => {
              setPlayers(
                produce(draftPlayers => {
                  draftPlayers.splice(i, 1, updatedPlayer);
                }),
              );
            }}
          />
        ))}
      </PlayersContainer>
      <div className="input">
        <label>Accuracy Roll</label>
        <input type="number" />
        <label>Damage Pool</label>
        <label>{damagePool}</label>
      </div>
      <NpcsContainer className="npcs">
        <button onClick={addNpc}>+</button>
        {npcs.map((npc, i) => (
          <NpcCard
            npc={npc}
            key={i}
            onChange={updatedNpc => {
              setNpcs(
                produce(draftNpcs => {
                  draftNpcs.splice(i, 1, updatedNpc);
                }),
              );
            }}
          />
        ))}
      </NpcsContainer>
      <div className="init">Initiative</div>
    </CombatRouteContainer>
  );
}

CombatRoute.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pinned: PropTypes.bool,
  active: PropTypes.bool,
  onPinToggle: PropTypes.func.isRequired,
  onRouteClicked: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

CombatRoute.defaultProps = {
  pinned: false,
  active: false,
};

export default CombatRoute;
