import React from 'react';
import { AlertTriangle, Activity, CheckCircle } from 'lucide-react';
import { Incident } from '../types';

interface IncidentListProps {
  incidents: Incident[];
  onSelectIncident: (incident: Incident) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents, onSelectIncident }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return <AlertTriangle className="text-red-500" />;
      case 'high':
        return <Activity className="text-orange-500" />;
      default:
        return <CheckCircle className="text-green-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold p-4 border-b">Incidents</h2>
      <ul>
        {incidents.map((incident) => (
          <li
            key={incident.id}
            className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectIncident(incident)}
          >
            <div className="flex items-center p-4">
              {getSeverityIcon(incident.severity)}
              <div className="ml-3">
                <p className="font-medium">{incident.title}</p>
                <p className="text-sm text-gray-500">
                  Severity: {incident.severity} | Status: {incident.status}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncidentList;