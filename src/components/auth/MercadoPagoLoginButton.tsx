
"use client";

import { Button } from "@/components/ui/button";

interface MercadoPagoLoginButtonProps {
  isConnected: boolean;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  disabled?: boolean;
}

export default function MercadoPagoLoginButton({
  isConnected,
  isLoading,
  onConnect,
  onDisconnect,
  disabled,
}: MercadoPagoLoginButtonProps) {
  return (
    <Button
      onClick={() => (isConnected ? onDisconnect() : onConnect())}
      disabled={isLoading || disabled}
      variant={isConnected ? "destructive" : "outline"}
      className="w-[120px]"
    >
      {isLoading ? "Aguarde..." : isConnected ? "Desconectar" : "Connectar"}
    </Button>
  );
}
