import React, { useState, useEffect } from "react";
import "./App.css";
import { Player, PlayerFilterOptions, Pitch, PitchFilterOptions } from "./types";
import PlayerFilterControls from "./components/PlayerSection/PlayerFilterControls";
import PlayerTable from "./components/PlayerSection/PlayerTable";
import PitchTable from "./components/PitchSection/PitchTable";
import PitchFilterControls from "./components/PitchSection/PitchFilterControls";
const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [pitches, setPitches] = useState<Pitch[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isPitchesLoading, setIsPitchesLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [pitchesError, setPitchesError] = useState<string>("");
  const [availableTeams, setAvailableTeams] = useState<string[]>([]);
  const [availablePositions, setAvailablePositions] = useState<string[]>([]);
  const [availablePlayerName, setAvailablePlayerName] = useState<string[]>([]);
  const [availableAwayTeam, setAvailableAwayTeam] = useState<string[]>([]);

  //api to get player details on load
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
  //api to get pitch details on load
  useEffect(() => {
    setIsPitchesLoading(true)
    fetch('http://localhost:5001/pitches').then((res) => res.json())
      .then((data) => {
        let players = data.filter((player) => player?.player_name)
        let awayTeam = data.filter((player) => player?.away_team)
        setAvailablePlayerName(players)
        setAvailableAwayTeam(awayTeam)
        setPitches(data)
      })
      .catch((err) => setPitchesError(err));
    setIsPitchesLoading(false)

  }, [])
  //handling filter chnages of Player Table
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
  //handling filter chnages of Pitch Table
  const handlePitchesFilterChange = (filters: PitchFilterOptions) => {
    setIsLoading(true)
    let name = filters?.name
    let away_team = filters?.away_team
    if (!filters?.name) {
      name = ''
    }
    if (!filters?.away_team) {
      away_team = ''
    }
    fetch(`http://localhost:5001/pitches?away_team=${away_team}&player_name=${name}`).then((res) => res.json())
      .then((data) => {
        let names = data.filter((pitch) => pitch?.name)
        let away_team = data.filter((pitch) => pitch?.away_team)
        setAvailablePlayerName(names)
        setAvailableAwayTeam(away_team)
        setPitches(data)
      })
      .catch((err) => setError(err));
    setIsLoading(false)
  };
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
        <section className="filter-section">
          <PitchFilterControls
            onFilterChange={handlePitchesFilterChange}
            availablePlayerName={availablePlayerName}
            availableAwayTeam={availableAwayTeam}
          />
        </section>
        <section className="data-section">
          <PitchTable pitches={pitches} isLoading={isPitchesLoading} error={pitchesError} />
        </section>
      </main>

      <footer>
        <p>Houston Astros - Staff Software Engineer Assessment</p>
      </footer>
    </div>
  );
};

export default App;
