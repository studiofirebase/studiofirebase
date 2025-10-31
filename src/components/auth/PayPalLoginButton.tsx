
"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PayPalLoginButtonProps {
  isConnected: boolean;
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function PayPalLoginButton({ isConnected, isLoading, onConnect, onDisconnect }: PayPalLoginButtonProps) {
  if (isLoading) {
    return (
      <Button disabled className="w-[150px]">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Carregando...
      </Button>
    );
  }

  if (isConnected) {
    return (
      <Button onClick={onDisconnect} variant="destructive" className="w-[150px]">
        Desconectar
      </Button>
    );
  }

  return (
    <Button onClick={onConnect} className="w-[150px] bg-[#00457C] hover:bg-[#003057]">
      Conectar
    </Button>
  );
}
