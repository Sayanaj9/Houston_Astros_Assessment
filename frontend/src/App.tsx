import React, { useState, useEffect } from "react";
import "./App.css";
import { Player, PlayerFilterOptions } from "./types";
import PlayerFilterControls from "./components/PlayerFilterControls";
import PlayerTable from "./components/PlayerTable";

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [availableTeams, setAvailableTeams] = useState<string[]>([]);
  const [availablePositions, setAvailablePositions] = useState<string[]>([]);

  const handleFilterChange = (filters: PlayerFilterOptions) => {
    setIsLoading(true)
    let team = filters?.team
    let position = filters?.position
    if (!filters?.team) {
      team = ''
    }
    if (!filters?.position) {
      position = ''
    }
    fetch(`http://localhost:5001/players?team=${team}&primary_position=${position}`).then((res) => res.json())
      .then((data) => {
        let teams = data.filter((player) => player?.team)
        let position = data.filter((player) => player?.primary_position)
        setAvailableTeams(teams)
        setAvailablePositions(position)
        setPlayers(data)
      })
      .catch((err) => setError(err));
    setIsLoading(false)
  };

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:5001/players').then((res) => res.json())
      .then((data) => {
        let teams = data.filter((player) => player?.team)
        let position = data.filter((player) => player?.primary_position)
        setAvailableTeams(teams)
        setAvailablePositions(position)
        setPlayers(data)
      })
      .catch((err) => setError(err));
    setIsLoading(false)

  }, [])
  return (
    <div className="App">
      <header>
        <h1>Baseball Player Statistics</h1>
        <p>Explore player statistics</p>
      </header>

      <main>
        {/* TODO: Player Filter controls */}
        <section className="filter-section">
          <PlayerFilterControls
            onFilterChange={handleFilterChange}
            availableTeams={availableTeams}
            availablePositions={availablePositions}
          />
        </section>

        {/* TODO: Player data table */}
        <section className="data-section">
          <PlayerTable players={players} isLoading={isLoading} error={error} />
        </section>

        {/* TODO: Pitch Filter Controls}
        {/* TODO: Implement pitches table */}
      </main>

      <footer>
        <p>Houston Astros - Staff Software Engineer Assessment</p>
      </footer>
    </div>
  );
};

export default App;
