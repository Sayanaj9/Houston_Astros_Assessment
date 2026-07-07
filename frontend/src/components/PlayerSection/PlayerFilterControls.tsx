

import React, { useState, ChangeEvent } from "react";
import { PlayerFilterOptions } from "../../types";

interface PlayerFilterControlsProps {
  onFilterChange: (filters: PlayerFilterOptions) => void;
  availableTeams?: string[];
  availablePositions?: string[];
}
const PlayerFilterControls: React.FC<PlayerFilterControlsProps> = ({
  onFilterChange,
  availableTeams = [],
  availablePositions = [],
}) => {
  const [filters, setFilters] = useState<PlayerFilterOptions>({});
  const handleTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // TODO: Implement team filter change handler
    const newFilters = {
      ...filters,
      team: event.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const handlePositionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // TODO: Implement position filter change handler
    const newFilters = {
      ...filters,
      position: event.target.value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  const clearFilters = () => {
    // TODO: Implement clear filters functionality
    const newFilters = {

      team: '',
      position: '',
    };
    setFilters({})
    onFilterChange(newFilters)
  };
  return (
    <div className="filter-controls">
      <h3>Filter Players</h3>
      <div className="filter-row">
        {/* TODO: Team filter dropdown */}
        <div className="filter-group">
          <label htmlFor="team-filter">Team:</label>
          <select
            id="team-filter"
            value={filters.team || ""}
            onChange={handleTeamChange}
          >
            {availableTeams?.map(({ team }, index) => (
              <option value={team} key={index}>{team}</option>
            ))}
            {/* TODO: Render team options from availableTeams */}
          </select>
        </div>
        {/* TODO: Position filter dropdown */}
        <div className="filter-group">
          <label htmlFor="position-filter">Position:</label>
          <select
            id="position-filter"
            value={filters.position || ""}
            onChange={handlePositionChange}
          >
            {availablePositions?.map(({ primary_position }, index) => (
              <option value={primary_position} key={index}>{primary_position}</option>
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

export default PlayerFilterControls;


