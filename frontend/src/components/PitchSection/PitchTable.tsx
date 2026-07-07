import React from "react";
import { Player } from "../types";

interface PitchTableProps {
  pitches: Player[];
  isLoading?: boolean;
  error?: string;
}

const PitchTable: React.FC<PitchTableProps> = ({
  pitches,
  isLoading = true,
  error,
}) => {

  if (isLoading) {
    return (
      <div className="player-table">
        <div className="loading">Loading pitchers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="player-table">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!isLoading && pitches?.length === 0) {
    return (
      <div className="player-table">
        <div className="no-data">No pitch found.</div>
      </div>
    );
  }

  return (
    <div className="player-table">
      <h2>Pitches ({pitches?.length} pitches)</h2>

      {/* TODO: Implement player table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Away Team</th>
              <th>Home Team</th>

            </tr>
          </thead>
          <tbody>
            {pitches?.map((pitch: {}, index: number) => (
              <tr key={index}>
                <td>{pitch?.player_name} </td>
                <td>{pitch?.away_team} </td>
                <td>{pitch?.home_team} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TODO: Add table features if time permits */}
      {/* Consider adding:
          - Sorting by column headers
          - Pagination for large datasets
          - Row highlighting on hover
          - Click to view player details
      */}
    </div>
  );
};

export default PitchTable;
