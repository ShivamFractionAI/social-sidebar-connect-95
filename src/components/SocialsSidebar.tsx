
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X,
  MessageCircle, 
  Send, 
  Phone, 
  Mail, 
  CheckCheck,
  ExternalLink
} from 'lucide-react';

interface SocialsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialsSidebar = ({ isOpen, onClose }: SocialsSidebarProps) => {
  const [connections, setConnections] = useState({
    discord: false,
    telegram: true,
    phone: false,
    email: false
  });

  const [highlightedBox, setHighlightedBox] = useState<string | null>(null);

  const handleConnect = (socialKey: string) => {
    setConnections(prev => ({
      ...prev,
      [socialKey]: true
    }));
    setHighlightedBox(socialKey);
    setTimeout(() => setHighlightedBox(null), 2000);
  };

  const getConnectionDisplay = (socialKey: string) => {
    switch (socialKey) {
      case 'phone':
        return '+91854XXXXX89';
      case 'email':
        return 'shiXXXXXXXXXtb@gmail.com';
      case 'telegram':
        return '@userXXXXXX123';
      case 'discord':
        return 'UserXXXXX#1234';
      default:
        return '';
    }
  };

  const socialConnections = [
    {
      key: "discord",
      name: "Discord",
      description: "Join our community",
      reward: "+500 FAPS",
      icon: MessageCircle,
      color: "bg-indigo-600/80",
      hoverColor: "hover:bg-indigo-700/80",
      connected: connections.discord
    },
    {
      key: "telegram",
      name: "Telegram", 
      description: "Get instant updates",
      reward: "+300 FAPS",
      icon: Send,
      color: "bg-blue-500/80",
      hoverColor: "hover:bg-blue-600/80", 
      connected: connections.telegram
    },
    {
      key: "phone",
      name: "Phone Number",
      description: "SMS notifications",
      reward: "+200 FAPS", 
      icon: Phone,
      color: "bg-green-600/80",
      hoverColor: "hover:bg-green-700/80",
      connected: connections.phone
    },
    {
      key: "email",
      name: "Email",
      description: "Weekly newsletter",
      reward: "+150 FAPS",
      icon: Mail, 
      color: "bg-orange-600/80",
      hoverColor: "hover:bg-orange-700/80",
      connected: connections.email
    }
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed right-0 top-0 h-full w-96 bg-gray-900/95 border-l border-amber-500/40 backdrop-blur-xl z-50 shadow-2xl shadow-amber-500/20
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-gray-200">Connect Socials</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-amber-500/30 hover:border-amber-500/50 transition-all"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Bonus Badge */}
          <div className="mb-6 p-4 bg-amber-500/25 rounded-xl border border-amber-500/40 shadow-sm shadow-amber-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-semibold text-amber-300">Special Bonus</span>
            </div>
            <p className="text-sm text-gray-300">
              Connect all social accounts and earn an additional <span className="text-amber-400 font-semibold">+250 FAPS</span> bonus!
            </p>
          </div>

          {/* Social Connections */}
          <div className="space-y-4">
            {socialConnections.map((social, index) => (
              <div 
                key={index}
                className={`rounded-xl p-4 border transition-all duration-300 hover:shadow-md hover:shadow-amber-500/15 hover:scale-[1.02] ${
                  social.connected
                    ? 'bg-orange-500/20 border-orange-500/50 shadow-lg shadow-orange-500/15' 
                    : highlightedBox === social.key 
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20' 
                      : 'bg-gray-800/60 border-amber-500/30 hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${social.color} flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-500/20`}>
                    <social.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-200">{social.name}</h3>
                      <div className="flex items-center space-x-2">
                        {social.connected ? (
                          <CheckCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleConnect(social.key)}
                            className="bg-amber-600 hover:bg-amber-700 text-black font-medium transition-all duration-300 shadow-sm shadow-amber-500/20 border border-amber-500/30"
                          >
                            Connect
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-2">{social.description}</p>
                    
                    <div className="mb-3">
                      <Badge variant="secondary" className="bg-amber-500/25 text-amber-400 border-amber-500/40 text-xs shadow-sm">
                        {social.reward}
                      </Badge>
                    </div>

                    {social.connected && (
                      <p className="text-xs text-amber-400 font-medium">{getConnectionDisplay(social.key)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 p-4 bg-gray-800/60 rounded-xl border border-amber-500/30 shadow-sm shadow-amber-500/15">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                Total potential earnings:
              </p>
              <p className="text-lg font-bold text-amber-400">
                +1,400 FAPS
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Connect all accounts to maximize your rewards
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
