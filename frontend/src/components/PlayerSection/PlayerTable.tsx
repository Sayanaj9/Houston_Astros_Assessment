import React from "react";
import { Player } from "../types";

interface PlayerTableProps {
  players: Player[];
  isLoading?: boolean;
  error?: string;
}

const PlayerTable: React.FC<PlayerTableProps> = ({
  players,
  isLoading = false,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="player-table">
        <div className="loading">Loading players...</div>
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

  if (players?.length === 0) {
    return (
      <div className="player-table">
        <div className="no-data">No players found.</div>
      </div>
    );
  }

  return (
    <div className="player-table">
      <h2>Players ({players?.length} players)</h2>

      {/* TODO: Implement player table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Position</th>

            </tr>
          </thead>
          <tbody>
            {players?.map((player: {}, index: number) => (
              <tr key={index}>
                <td>{`${player?.first_name} ${player?.last_name}`}</td>
                <td>{player?.team} </td>
                <td>{player?.primary_position} </td>
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

export default PlayerTable;
