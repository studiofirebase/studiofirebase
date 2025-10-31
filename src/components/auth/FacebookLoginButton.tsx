'use client';

import { Button } from "@/components/ui/button";
import { Facebook } from "lucide-react"; 

interface FacebookLoginButtonProps {
  isConnected: boolean;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  disabled?: boolean;
}

const FacebookLoginButton = ({ 
  isConnected, 
  isLoading, 
  onConnect, 
  onDisconnect, 
  disabled 
}: FacebookLoginButtonProps) => {

  if (isConnected) {
    return (
      <Button 
        onClick={onDisconnect} 
        disabled={isLoading || disabled}
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
      disabled={isLoading || disabled}
      className="w-[180px] bg-[#1877F2] hover:bg-[#166eab] text-white flex items-center justify-center gap-2"
    >
      {isLoading ? (
        'Conectando...'
      ) : (
        <>
          <Facebook className="w-5 h-5" />
          Conectar
        </>
      )}
    </Button>
  );
};

export default FacebookLoginButton;
