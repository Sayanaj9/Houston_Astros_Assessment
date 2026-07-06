

import React, { useState, ChangeEvent } from "react";
import { PitchFilterOptions } from "../../types";

interface PitchFilterControlsProps {
  onFilterChange: (filters: PitchFilterOptions) => void;
  availableTeams?: string[];
  availablePositions?: string[];
}
const PitchFilterControls: React.FC<PitchFilterControlsProps> = ({
  onFilterChange,
  availablePlayerName = [],
  availableAwayTeam = [],
}) => {
  const [filters, setFilters] = useState<PitchFilterOptions>({});
  const handlePlayerChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // TODO: Implement team filter change handler
    const newFilters = {
      ...filters,
      name: event.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const handleAwayTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // TODO: Implement position filter change handler
    const newFilters = {
      ...filters,
      away_team: event.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const clearFilters = () => {
    // TODO: Implement clear filters functionality
    const newFilters = {

      name: '',
      awayTeam: '',
    };
    setFilters({})
    onFilterChange(newFilters)
  };
  return (
    <div className="filter-controls">
      <h3>Filter Pitches</h3>
      <div className="filter-row">
        {/* TODO: Team filter dropdown */}
        <div className="filter-group">
          <label htmlFor="team-filter">Player Name:</label>
          <select
            id="team-filter"
            value={filters.team || ""}
            onChange={handlePlayerChange}
          >
            {availablePlayerName?.map((player) => (
              <option value={player?.player_name}>{player?.player_name}</option>
            ))}
            {/* TODO: Render team options from availableTeams */}
          </select>
        </div>
        {/* TODO: Position filter dropdown */}
        <div className="filter-group">
          <label htmlFor="position-filter">Away Team:</label>
          <select
            id="position-filter"
            value={filters.position || ""}
            onChange={handleAwayTeamChange}
          >
            {availableAwayTeam?.map((away) => (
              <option value={away?.away_team}>{away?.away_team}</option>
            ))}
            {/* TODO: Render position options from availablePositions */}
          </select>
        </div>
        {/* TODO: Clear filters button */}
        <button onClick={clearFilters} className="clear-filters">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default PitchFilterControls;


