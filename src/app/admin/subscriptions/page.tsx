'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Loader2, 
  RefreshCw, 
  Trash2, 
  CreditCard, 
  User, 
  Search,
  Filter,
  Eye,
  Clock,
  Users,
  Crown
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getAllSubscriptionsAdmin, cancelUserSubscription, cleanupExpiredSubscriptions, deleteTestSubscriptions } from './actions';
import { UserSubscription, SubscriptionPlan } from '@/lib/subscription-manager';

interface SubscriptionWithPlan extends UserSubscription {
  plan?: SubscriptionPlan;
}

export default function AdminSubscriptionsPage() {
  const { toast } = useToast();
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithPlan[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<SubscriptionWithPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCleaningUp, setIsCleaningUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'canceled'>('all');

  const fetchSubscriptions = async () => {
    setIsLoading(true);
    try {
      const result = await getAllSubscriptionsAdmin();
      
      if (result.success) {
        setSubscriptions(result.subscriptions || []);
        setFilteredSubscriptions(result.subscriptions || []);
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao carregar assinaturas',
          description: result.error || 'Erro desconhecido'
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar assinaturas',
        description: error?.message || 'Erro interno do servidor'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar assinaturas
  useEffect(() => {
    let filtered = subscriptions;

    // Filtrar por busca
    if (searchTerm) {
      filtered = filtered.filter(sub => 
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.plan?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }

    setFilteredSubscriptions(filtered);
  }, [subscriptions, searchTerm, statusFilter]);

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm('Tem certeza que deseja cancelar esta assinatura?')) return;

    try {
      const result = await cancelUserSubscription(subscriptionId);
      if (result.success) {
        toast({
          title: 'Assinatura cancelada',
          description: 'A assinatura foi cancelada com sucesso'
        });
        await fetchSubscriptions();
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao cancelar',
          description: result.error
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao cancelar',
        description: 'Erro interno do servidor'
      });
    }
  };

  const handleCleanupExpired = async () => {
    setIsCleaningUp(true);
    try {
      const result = await cleanupExpiredSubscriptions();
      if (result.success) {
        toast({
          title: 'Cleanup realizado',
          description: `${result.cleanupCount} assinaturas expiradas foram atualizadas`
        });
        await fetchSubscriptions();
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro no cleanup',
          description: result.error
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro no cleanup',
        description: 'Erro interno do servidor'
      });
    } finally {
      setIsCleaningUp(false);
    }
  };

  const handleDeleteTestSubscriptions = async () => {
    if (!confirm('Tem certeza que deseja excluir TODAS as assinaturas de teste? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const result = await deleteTestSubscriptions();
      
      if (result.success) {
        toast({
          title: 'Exclusão concluída',
          description: `${result.deletedCount} assinaturas de teste foram excluídas permanentemente`
        });
        
        // Recarregar a lista
        await fetchSubscriptions();
      } else {
        toast({
          variant: 'destructive',
          title: 'Erro ao excluir assinaturas de teste',
          description: result.error || 'Erro desconhecido'
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir assinaturas de teste',
        description: 'Erro interno do servidor'
      });
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const getStatusBadge = (status: UserSubscription['status']) => {
    const variants = {
      active: 'default',
      expired: 'secondary',
      canceled: 'destructive',
      pending: 'outline'
    } as const;

    const labels = {
      active: 'Ativa',
      expired: 'Expirada',
      canceled: 'Cancelada',
      pending: 'Pendente'
    };

    const colors = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      expired: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      canceled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    };

    return (
      <Badge className={colors[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString));
  };

  const formatPrice = (price?: number) => {
    return price ? new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price) : 'N/A';
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter(s => s.status === 'active').length,
    expired: subscriptions.filter(s => s.status === 'expired').length,
    canceled: subscriptions.filter(s => s.status === 'canceled').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Crown className="w-8 h-8 text-yellow-500" />
            Gerenciar Assinaturas
          </h1>
          <p className="text-muted-foreground mt-1">
            Gerencie todas as assinaturas e assinantes do sistema
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleCleanupExpired} 
            variant="outline"
            disabled={isCleaningUp}
          >
            {isCleaningUp ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Limpar Expiradas
          </Button>
          <Button onClick={fetchSubscriptions} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          {/* <Button 
            onClick={handleDeleteTestSubscriptions} 
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-200"
          >
            🗑️ Excluir Testes
          </Button> */}
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
          <CardDescription>
            Encontre assinaturas específicas rapidamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por email, plano ou método de pagamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                <Filter className="w-4 h-4 mr-1" />
                Todos ({subscriptions.length})
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
                className="bg-green-600 hover:bg-green-700"
              >
                Ativas ({stats.active})
              </Button>
              <Button
                variant={statusFilter === 'expired' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('expired')}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                Expiradas ({stats.expired})
              </Button>
              <Button
                variant={statusFilter === 'canceled' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('canceled')}
                className="bg-red-600 hover:bg-red-700"
              >
                Canceladas ({stats.canceled})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Assinaturas */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Assinaturas ({filteredSubscriptions.length})</CardTitle>
          <CardDescription>
            Gerencie todas as assinaturas do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredSubscriptions.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Nenhuma assinatura encontrada</p>
              <p className="text-sm">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Tente ajustar os filtros de busca.' 
                  : 'Ainda não há assinaturas no sistema.'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assinante</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead>Tempo Restante</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscriptions.map((subscription) => {
                    const daysRemaining = getDaysRemaining(subscription.endDate);
                    const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
                    
                    return (
                      <TableRow key={subscription.id} className={isExpiringSoon ? 'bg-yellow-50 dark:bg-yellow-950/20' : ''}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="font-medium">{subscription.email}</div>
                              <div className="text-xs text-muted-foreground">
                                ID: {subscription.userId?.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {subscription.plan?.name || subscription.planId}
                            </div>
                            {subscription.plan?.popular && (
                              <Badge variant="outline" className="text-xs">
                                <Crown className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(subscription.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-muted-foreground" />
                            <span className="capitalize">{subscription.paymentMethod}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {formatPrice(subscription.plan?.price)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Início: {formatDate(subscription.startDate)}</div>
                            <div>Fim: {formatDate(subscription.endDate)}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {subscription.status === 'active' ? (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className={isExpiringSoon ? 'text-yellow-600 font-medium' : ''}>
                                {daysRemaining > 0 ? `${daysRemaining} dias` : 'Expirada'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {subscription.status === 'active' && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelSubscription(subscription.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Cancelar
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
