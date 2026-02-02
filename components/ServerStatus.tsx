import React, { useEffect, useState } from 'react';
import { Wifi, Users, Activity } from 'lucide-react';
import { ServerStatusData } from '../types';
import { SERVER_IP } from '../constants';

const ServerStatus: React.FC = () => {
  const [status, setStatus] = useState<ServerStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        if (!response.ok) {
           throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStatus(data);
        setLoading(false);
        setError(false);
      } catch (err) {
        // Silently handle error and set offline status to keep UI clean
        setStatus({
            online: false,
            players: { online: 0, max: 0 },
            version: 'Unknown',
            motd: { clean: ['Unable to reach server API.'] }
        });
        setLoading(false);
        // Do not set error(true) to avoid the broken UI state, just show offline
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="status" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#202020]/90 border-4 border-white/20 p-1 md:p-2 backdrop-blur-sm shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
           {/* Inner Minecraft Border */}
           <div className="border-4 border-black/50 bg-[#111111]/80 p-6 md:p-10 flex flex-col items-center text-center relative overflow-hidden">
              
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]"></div>

              <h2 className="font-minecraft text-3xl md:text-4xl text-mc-aqua mb-8 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">
                Server Status
              </h2>

              {loading ? (
                <div className="font-console text-2xl text-yellow-400 animate-pulse">
                  Scanning subspace frequencies...
                </div>
              ) : error ? (
                <div className="font-console text-2xl text-red-500">
                  <Activity className="inline-block mr-2" /> Connection Lost
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {/* Status Indicator */}
                  <div className="flex flex-col items-center p-4 bg-white/5 border-2 border-white/10 rounded">
                    <Wifi className={`w-12 h-12 mb-4 ${status?.online ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="font-minecraft text-sm text-gray-400 mb-1">Status</span>
                    <span className={`font-console text-2xl ${status?.online ? 'text-green-400' : 'text-red-400'}`}>
                      {status?.online ? 'ONLINE' : 'OFFLINE'}
                    </span>
                  </div>

                  {/* Player Count */}
                  <div className="flex flex-col items-center p-4 bg-white/5 border-2 border-white/10 rounded">
                    <Users className="w-12 h-12 mb-4 text-mc-gold" />
                    <span className="font-minecraft text-sm text-gray-400 mb-1">Astronauts</span>
                    <span className="font-console text-2xl text-yellow-300">
                      {status?.players?.online ?? 0} <span className="text-gray-500">/</span> {status?.players?.max ?? 0}
                    </span>
                  </div>

                  {/* Ping/Version */}
                  <div className="flex flex-col items-center p-4 bg-white/5 border-2 border-white/10 rounded">
                    <Activity className="w-12 h-12 mb-4 text-mc-purple" />
                    <span className="font-minecraft text-sm text-gray-400 mb-1">Version</span>
                    <span className="font-console text-2xl text-purple-300">
                      {status?.version || 'Unknown'}
                    </span>
                  </div>
                </div>
              )}

              {/* Live MOTD */}
              {status?.motd?.clean && (
                <div className="mt-8 p-4 bg-black/60 border border-white/20 w-full font-minecraft text-sm text-gray-300 leading-loose">
                  {status?.motd?.clean.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
           </div>
        </div>
      </div>
    </section>
  );
};

export default ServerStatus;