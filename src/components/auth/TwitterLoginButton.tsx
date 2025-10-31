'use client';

import { Button } from "@/components/ui/button";
import { FaTwitter } from "react-icons/fa";

interface TwitterLoginButtonProps {
  isConnected: boolean;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const TwitterLoginButton = ({ isConnected, isLoading, onConnect, onDisconnect }: TwitterLoginButtonProps) => {

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
      className="w-[180px] flex items-center justify-center gap-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white"
    >
      <FaTwitter size={20} />
      {isLoading ? 'Conectando...' : 'Conectar'}
    </Button>
  );
};

export default TwitterLoginButton;
