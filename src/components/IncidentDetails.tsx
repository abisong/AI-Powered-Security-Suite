import React from 'react';
import { Incident } from '../types';

interface IncidentDetailsProps {
  incident: Incident;
  onStatusUpdate: (id: number, newStatus: string) => void;
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({ incident, onStatusUpdate }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusUpdate(incident.id, e.target.value);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">{incident.title}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Severity</p>
          <p className="mt-1">{incident.severity}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Status</p>
          <select
            value={incident.status}
            onChange={handleStatusChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-500">Description</p>
        <p className="mt-1">
          This is a placeholder description for the incident. In a real application, this would contain detailed information about the nature of the incident, affected systems, and initial observations.
        </p>
      </div>
    </div>
  );
};

export default IncidentDetails;