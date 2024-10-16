import React, { useState } from 'react';
import { Shield, Activity, Search, Eye } from 'lucide-react';
import IncidentList from './components/IncidentList';
import IncidentDetails from './components/IncidentDetails';
import AIAssistant from './components/AIAssistant';
import VulnerabilityScanner from './components/VulnerabilityScanner';
import ThreatDetector from './components/ThreatDetector';
import { Incident, Vulnerability, Threat } from './types';

const mockIncidents: Incident[] = [
  { id: 1, title: 'Suspicious Login Attempt', severity: 'High', status: 'Open' },
  { id: 2, title: 'Malware Detected', severity: 'Critical', status: 'In Progress' },
  { id: 3, title: 'Data Exfiltration Attempt', severity: 'High', status: 'Open' },
];

const mockVulnerabilities: Vulnerability[] = [
  { id: 1, name: 'Outdated SSL Certificate', severity: 'High', status: 'Open', system: 'Web Server' },
  { id: 2, name: 'Unpatched OS Vulnerability', severity: 'Critical', status: 'In Progress', system: 'Database Server' },
  { id: 3, name: 'Weak Password Policy', severity: 'Medium', status: 'Open', system: 'User Management' },
];

const mockThreats: Threat[] = [
  { id: 1, type: 'Brute Force Attack', severity: 'High', timestamp: '2023-04-10T14:32:00Z', details: 'Multiple failed login attempts detected from IP 192.168.1.100' },
  { id: 2, type: 'Potential SQL Injection', severity: 'Medium', timestamp: '2023-04-10T15:45:00Z', details: 'Suspicious SQL query patterns detected in web application logs' },
  { id: 3, type: 'Unusual Data Transfer', severity: 'High', timestamp: '2023-04-10T16:20:00Z', details: 'Large amount of data transferred to an unknown external IP address' },
];

function App() {
  const [activeTab, setActiveTab] = useState<'incidents' | 'vulnerabilities' | 'threats'>('incidents');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>(mockVulnerabilities);

  const handleIncidentSelect = (incident: Incident) => {
    setSelectedIncident(incident);
  };

  const handleIncidentStatusUpdate = (id: number, newStatus: string) => {
    setIncidents(incidents.map(inc => inc.id === id ? { ...inc, status: newStatus } : inc));
    if (selectedIncident && selectedIncident.id === id) {
      setSelectedIncident({ ...selectedIncident, status: newStatus });
    }
  };

  const handleVulnerabilityStatusUpdate = (id: number, newStatus: string) => {
    setVulnerabilities(vulnerabilities.map(vuln => vuln.id === id ? { ...vuln, status: newStatus } : vuln));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Shield className="mr-2" size={24} />
            <h1 className="text-2xl font-bold">AI-Powered Security Suite</h1>
          </div>
          <nav>
            <button
              className={`mr-4 ${activeTab === 'incidents' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('incidents')}
            >
              <Activity className="inline mr-1" size={18} /> Incidents
            </button>
            <button
              className={`mr-4 ${activeTab === 'vulnerabilities' ? 'font-bold' : ''}`}
              onClick={() => setActiveTab('vulnerabilities')}
            >
              <Search className="inline mr-1" size={18} /> Vulnerabilities
            </button>
            <button
              className={activeTab === 'threats' ? 'font-bold' : ''}
              onClick={() => setActiveTab('threats')}
            >
              <Eye className="inline mr-1" size={18} /> Threats
            </button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-4">
        {activeTab === 'incidents' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <IncidentList incidents={incidents} onSelectIncident={handleIncidentSelect} />
            </div>
            <div className="md:col-span-2">
              {selectedIncident ? (
                <>
                  <IncidentDetails incident={selectedIncident} onStatusUpdate={handleIncidentStatusUpdate} />
                  <AIAssistant incident={selectedIncident} />
                </>
              ) : (
                <p className="text-center text-gray-500 mt-8">Select an incident to view details and AI recommendations</p>
              )}
            </div>
          </div>
        )}
        {activeTab === 'vulnerabilities' && (
          <VulnerabilityScanner vulnerabilities={vulnerabilities} onStatusUpdate={handleVulnerabilityStatusUpdate} />
        )}
        {activeTab === 'threats' && (
          <ThreatDetector threats={mockThreats} />
        )}
      </main>
    </div>
  );
}

export default App;