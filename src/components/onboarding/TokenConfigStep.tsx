import { useState } from 'react';
import { Key, Database } from 'lucide-react';

interface TokenConfigStepProps {
  onConfigSubmit: (config: {
    motherduckToken: string;
    airbyteToken: string;
    airbyteConnectionId: string;
  }) => void;
}

export default function TokenConfigStep({ onConfigSubmit }: TokenConfigStepProps) {
  const [config, setConfig] = useState({
    motherduckToken: '',
    airbyteToken: '',
    airbyteConnectionId: ''
  });

  const handleChange = () => {
    onConfigSubmit(config);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-2">
          <Database className="mr-2 text-blue-400" />
          <span className="text-lg font-medium">MotherDuck Configuration</span>
        </div>
        <input
          type="password"
          value={config.motherduckToken}
          onChange={(e) => {
            setConfig(prev => ({ ...prev, motherduckToken: e.target.value }));
            handleChange();
          }}
          placeholder="Enter your MotherDuck token"
          className="w-full px-4 py-3 rounded-lg bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      <div>
        <div className="flex items-center mb-2">
          <Key className="mr-2 text-blue-400" />
          <span className="text-lg font-medium">Airbyte Configuration</span>
        </div>
        <div className="space-y-4">
          <input
            type="password"
            value={config.airbyteToken}
            onChange={(e) => {
              setConfig(prev => ({ ...prev, airbyteToken: e.target.value }));
              handleChange();
            }}
            placeholder="Enter your Airbyte bearer token"
            className="w-full px-4 py-3 rounded-lg bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          <input
            type="text"
            value={config.airbyteConnectionId}
            onChange={(e) => {
              setConfig(prev => ({ ...prev, airbyteConnectionId: e.target.value }));
              handleChange();
            }}
            placeholder="Enter your Airbyte connection ID"
            className="w-full px-4 py-3 rounded-lg bg-gray-800/80 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>
      </div>

      <div className="text-sm text-gray-400">
        <p>These configurations are optional. Leave empty to use default settings.</p>
      </div>
    </div>
  );
}
