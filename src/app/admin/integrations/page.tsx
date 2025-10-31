
"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getIntegrationStatus, disconnectService, type Integration } from './actions';
import IntegrationCard from "./components/IntegrationCard";
import FacebookLoginButton from "@/components/auth/FacebookLoginButton";
import PayPalLoginButton from "@/components/auth/PayPalLoginButton"; // Importado
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Importar os ícones
import { FacebookIcon } from '@/components/icons/FacebookIcon';
import { InstagramIcon } from '@/components/icons/InstagramIcon';
import { TwitterIcon } from '@/components/icons/TwitterIcon';
import { PayPalIcon } from '@/components/icons/PayPalIcon';
import { MercadoPagoIcon } from '@/components/icons/MercadoPagoIcon';

export default function AdminIntegrationsPage() {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Record<string, boolean>>({
    twitter: false,
    instagram: false,
    facebook: false,
    paypal: false,
    mercadopago: false,
  });
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    twitter: true,
    instagram: true,
    facebook: true,
    paypal: true,
    mercadopago: true,
  });

  useEffect(() => {
    async function fetchAllStatus() {
        const services: Integration[] = ['twitter', 'instagram', 'facebook', 'paypal' as any, 'mercadopago' as any];
        
        const statuses = await Promise.all(services.map(async (service) => {
            const status = await getIntegrationStatus(service as any);
            return { service, status };
        }));
        
        const newIntegrationsState: Record<string, boolean> = { ...integrations };
        const newLoadingState: Record<string, boolean> = { ...isLoading };
        
        statuses.forEach(({ service, status }) => {
            if (typeof status === 'object') {
                newIntegrationsState[service] = status.connected;
            } else {
                newIntegrationsState[service] = status;
            }
            newLoadingState[service] = false;
        });

        setIntegrations(newIntegrationsState);
        setIsLoading(newLoadingState);
    }
    fetchAllStatus();
  }, []);

  const handleConnect = (platform: Integration) => {
    setIsLoading(prev => ({ ...prev, [platform]: true }));
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const urlPath = platform === 'twitter' ? '/api/auth/twitter-login' : `/api/auth/${platform}`;
    const url = urlPath;
    const popup = window.open(url, '_blank', `width=${width},height=${height},top=${top},left=${left}`);

    if (!popup || popup.closed) {
      window.location.href = url;
      return;
    }

    const messageListener = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
            return;
        }

        const { success, error, message, platform: eventPlatform, username } = event.data;

        if (eventPlatform !== platform) {
            return;
        }

        if (success) {
            toast({
                title: "Conexão realizada com sucesso!",
                description: `${platform.charAt(0).toUpperCase() + platform.slice(1)} foi conectado à sua conta.`,
            });
            setIntegrations(prev => ({ ...prev, [platform]: true, ...(platform === 'instagram' && { facebook: true }) }));
            
            if (platform === 'twitter' && username) {
                localStorage.setItem('twitter_username', username);
                toast({ 
                    title: "Nome de usuário salvo!", 
                    description: `O feed de vídeos agora usará @${username}.`,
                });
            }
        }

        if (error) {
            const errorMessages: Record<string, string> = {
                'facebook_auth_failed': 'Falha na autenticação do Facebook',
                'instagram_connection_failed': 'Falha na conexão com Instagram. Verifique se a página do Facebook tem uma conta do Instagram de negócios vinculada.',
                'twitter_auth_failed': 'Falha na autenticação do Twitter',
                'twitter_auth_denied': 'Você negou o acesso do aplicativo ao Twitter.',
                'twitter_no_token': 'Token de autorização não recebido do Twitter.',
                'firebase_init_failed': 'O sistema não está configurado corretamente (Firebase).',
                'twitter_token_failed': 'Não foi possível obter os tokens de acesso do Twitter.',
                'twitter_server_error': 'Ocorreu um erro no servidor ao tentar conectar com o Twitter.',
                'paypal_auth_failed': 'Falha na autenticação com o PayPal.',
                'mercadopago_auth_failed': 'Falha na autenticação com o Mercado Pago.',
            };

            toast({
                variant: 'destructive',
                title: "Erro na conexão",
                description: message || errorMessages[error] || `Erro desconhecido: ${error}`,
            });
        }
        setIsLoading(prev => ({ ...prev, [platform]: false }));
        window.removeEventListener('message', messageListener);
    };

    window.addEventListener('message', messageListener);

    const timer = setInterval(() => {
        if (popup?.closed) {
            clearInterval(timer);
            setIsLoading(prev => ({ ...prev, [platform]: false }));
            window.removeEventListener('message', messageListener);
        }
    }, 500);
  };

  const handleFacebookConnect = () => {
    setIsLoading(prev => ({ ...prev, facebook: true }));

    // @ts-ignore
    window.FB.login(function(response) {
      if (response.authResponse) {
        toast({ title: "Conectado com sucesso!", description: "Sua conta do Facebook foi conectada." });
        setIntegrations(prev => ({ ...prev, facebook: true }));
      } else {
        toast({ variant: 'destructive', title: "Falha no Login", description: "O login com o Facebook foi cancelado ou falhou." });
      }
      setIsLoading(prev => ({ ...prev, facebook: false }));
    }, {scope: 'public_profile,email'});
  };

  const handleDisconnect = async (platform: Integration) => {
    setIsLoading(prev => ({ ...prev, [platform]: true }));
    try {
      const result = await disconnectService(platform);
      if (result.success) {
        setIntegrations(prev => ({ ...prev, [platform]: false, ...(platform === 'instagram' && { facebook: false }) }));
        toast({ title: "Desconectado com sucesso", description: result.message });

        if (platform === 'twitter') {
            localStorage.removeItem('twitter_username');
            try { await fetch('/api/auth/twitter/logout', { method: 'POST' }); } catch {}
        }
        if (platform === 'facebook') {
            // @ts-ignore
            window.FB.logout();
        }
      } else {
        toast({ variant: 'destructive', title: "Falha ao desconectar", description: result.message });
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Erro no servidor", description: error.message });
    } finally {
      setIsLoading(prev => ({ ...prev, [platform]: false }));
    }
  };
  
  const handleSyncFeed = async (platform: 'instagram' | 'facebook') => {
    setIsLoading(prev => ({ ...prev, [platform]: true }));
    try {
      const response = await fetch(`/api/admin/${platform}-feed`);
      const result = await response.json();
      if (result.success) {
        toast({ title: "Sincronização Concluída", description: result.message });
      } else {
        toast({ variant: 'destructive', title: "Falha na Sincronização", description: result.message });
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: "Erro de Rede", description: "Não foi possível conectar ao servidor para sincronizar o feed." });
    } finally {
      setIsLoading(prev => ({ ...prev, [platform]: false }));
    }
  };

  const integrationData = [
    {
      platform: 'mercadopago',
      title: 'Mercado Pago',
      description: 'Conecte sua conta para receber pagamentos via Pix e outros métodos.',
      icon: <MercadoPagoIcon />,
    },
    {
        platform: 'instagram',
        title: 'Instagram',
        description: 'Exibir galeria de fotos e posts recentes.',
        icon: <InstagramIcon />,
        onSync: () => handleSyncFeed('instagram'),
    },
    {
        platform: 'twitter',
        title: 'Twitter / X',
        description: 'Exibir feed de fotos recentes.',
        icon: <TwitterIcon />,
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Integrações de Plataformas</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Card do Facebook separado */}
        <IntegrationCard
          platform="facebook"
          title="Facebook"
          description="Exibir galeria de fotos e posts recentes."
          icon={<FacebookIcon />}
          isConnected={integrations.facebook}
          isLoading={isLoading.facebook}
          onConnect={handleFacebookConnect}
          onDisconnect={() => handleDisconnect('facebook')}
          onSync={() => handleSyncFeed('facebook')}
          syncing={isLoading.facebook}
        />
        
        {/* Card do PayPal separado */}
        <Card className="w-full max-w-sm">
            <CardHeader>
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 flex items-center justify-center rounded-lg">
                        <PayPalIcon />
                    </div>
                    <div>
                        <CardTitle>PayPal</CardTitle>
                        <CardDescription>Conecte sua conta para receber pagamentos na loja.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
                <PayPalLoginButton
                    isConnected={integrations.paypal}
                    isLoading={isLoading.paypal}
                    onConnect={() => handleConnect('paypal' as any)}
                    onDisconnect={() => handleDisconnect('paypal' as any)}
                />
            </CardContent>
        </Card>

        {integrationData.map((data) => (
          <IntegrationCard
            key={data.platform}
            platform={data.platform}
            title={data.title}
            description={data.description}
            icon={data.icon}
            isConnected={integrations[data.platform]}
            isLoading={isLoading[data.platform]}
            onConnect={() => handleConnect(data.platform as Integration)}
            onDisconnect={() => handleDisconnect(data.platform as Integration)}
            onSync={data.onSync}
            syncing={isLoading[data.platform]}
          />
        ))}
      </div>
    </>
  );
}
