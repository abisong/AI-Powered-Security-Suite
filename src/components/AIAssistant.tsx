import React, { useState, useEffect } from 'react';
import { Incident } from '../types';

interface AIAssistantProps {
  incident: Incident;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ incident }) => {
  const [recommendation, setRecommendation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    // Simulating AI response delay
    const timer = setTimeout(() => {
      setRecommendation(generateRecommendation(incident));
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [incident]);

  const generateRecommendation = (incident: Incident): string => {
    // In a real application, this would be an API call to an AI service
    switch (incident.title) {
      case 'Suspicious Login Attempt':
        return "1. Lock the affected account immediately.\n2. Analyze login patterns and IP addresses.\n3. Enable multi-factor authentication if not already in place.\n4. Review and update access policies.";
      case 'Malware Detected':
        return "1. Isolate the infected system from the network.\n2. Run a full system scan using updated antivirus software.\n3. Identify the malware type and its potential impact.\n4. Check other systems for similar infections.\n5. Update all systems and software to patch vulnerabilities.";
      case 'Data Exfiltration Attempt':
        return "1. Identify the data that was potentially exfiltrated.\n2. Block the destination IP/domain used in the exfiltration attempt.\n3. Review and strengthen data loss prevention (DLP) policies.\n4. Conduct a thorough investigation of the incident's root cause.\n5. Prepare for potential regulatory reporting requirements.";
      default:
        return "Analyzing the incident... Please provide more details for a tailored recommendation.";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-4">AI Assistant Recommendations</h3>
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="prose max-w-none">
          <pre className="text-sm bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
            {recommendation}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;