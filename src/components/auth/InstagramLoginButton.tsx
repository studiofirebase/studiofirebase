'use client';

import { Button } from "@/components/ui/button";
import { FaInstagram } from "react-icons/fa";

interface InstagramLoginButtonProps {
  isConnected: boolean;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const InstagramLoginButton = ({ isConnected, isLoading, onConnect, onDisconnect }: InstagramLoginButtonProps) => {

  if (isConnected) {
    return (
      <Button 
        onClick={onDisconnect} 
        disabled={isLoading}
        variant="destructive"
        className="w-[180px] flex items-center justify-center gap-2"
      >
        {isLoading ? 'Desconectando...' : 'Desconectar'}
      </Button>
    );
  }

  return (
    <Button 
      onClick={onConnect} 
      disabled={isLoading}
      className="w-[180px] flex items-center justify-center gap-2 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white"
    >
      <FaInstagram size={20} />
      {isLoading ? 'Conectando...' : 'Conectar'}
    </Button>
  );
};

export default InstagramLoginButton;
