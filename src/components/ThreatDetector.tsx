import React from 'react';
import { AlertTriangle, Activity, CheckCircle } from 'lucide-react';
import { Threat } from '../types';

interface ThreatDetectorProps {
  threats: Threat[];
}

const ThreatDetector: React.FC<ThreatDetectorProps> = ({ threats }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="text-red-500" />;
      case 'medium':
        return <Activity className="text-orange-500" />;
      default:
        return <CheckCircle className="text-yellow-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold p-4 border-b">Detected Threats</h2>
      <ul>
        {threats.map((threat) => (
          <li key={threat.id} className="border-b last:border-b-0 p-4">
            <div className="flex items-start">
              {getSeverityIcon(threat.severity)}
              <div className="ml-3 flex-grow">
                <p className="font-medium">{threat.type}</p>
                <p className="text-sm text-gray-500">
                  Severity: {threat.severity} | Detected: {new Date(threat.timestamp).toLocaleString()}
                </p>
                <p className="text-sm mt-1">{threat.details}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThreatDetector;