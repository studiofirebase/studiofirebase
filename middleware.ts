import { NextRequest, NextResponse } from 'next/server';

// Rotas que requerem assinatura ativa
const SUBSCRIPTION_REQUIRED_PATHS = [
  '/galeria-assinantes'
];

// Rotas que requerem apenas autenticação básica
const AUTH_REQUIRED_PATHS = [
  '/dashboard',
  '/assinante'
];

// Emails de administrador autorizados
const ADMIN_EMAILS = [
  'michael.devid98@gmail.com',
  'pix@italosantos.com',
  'contato@italosantos.com'
];

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin');
}

function checkAdminAuth(request: NextRequest): boolean {
  // Verificar cookie de admin
  const isAdminCookie = request.cookies.get('isAdmin')?.value === 'true';
  const isAuthenticatedCookie = request.cookies.get('isAuthenticated')?.value === 'true';
  
  // Para admin, aceitar se ambos os cookies estão presentes
  return isAdminCookie && isAuthenticatedCookie;
}

export function middleware(request: NextRequest) {
  const ENV = process.env.NODE_ENV as string;
  const pathname = request.nextUrl.pathname;
  
  // 🔧 MIDDLEWARE DESABILITADO PARA GALERIA EXCLUSIVA - deixar o componente gerenciar
  if (pathname.startsWith('/galeria-assinantes')) {
    if (String(ENV) !== 'production') {
      console.log('[MIDDLEWARE] Galeria exclusiva - permitindo acesso direto');
    }
    return NextResponse.next();
  }
  
  // 🔧 MIDDLEWARE TEMPORARIAMENTE DESABILITADO PARA DESENVOLVIMENTO
  if (String(ENV) === 'development') {
    if (String(ENV) !== 'production') {
      console.log('[MIDDLEWARE ROOT] DESABILITADO - Path:', pathname);
    }
    return NextResponse.next();
  }
  
  // 🔒 CRÍTICO: NÃO aplicar middleware para rotas do admin - deixar o layout do admin gerenciar
  if (isAdminRoute(pathname)) {
    return NextResponse.next();
  }
  
  // Verificar se é uma rota protegida que requer assinatura
  const requiresSubscription = SUBSCRIPTION_REQUIRED_PATHS.some(path => 
    pathname.startsWith(path)
  );
  
  if (requiresSubscription) {
    // Verificar headers ou cookies para autenticação/assinatura
    const isAuthenticated = request.headers.get('x-authenticated') === 'true' ||
                           request.cookies.get('isAuthenticated')?.value === 'true';
    
    const hasSubscription = request.headers.get('x-has-subscription') === 'true' ||
                          request.cookies.get('hasSubscription')?.value === 'true';
    
    // Se não estiver autenticado, redirecionar para Face ID
    if (!isAuthenticated) {
      const redirectResponse = NextResponse.redirect(new URL('/auth/face', request.url));
      
      // Limpar cookies de autenticação inválidos
      redirectResponse.cookies.set('isAuthenticated', '', { expires: new Date(0), path: '/' });
      redirectResponse.cookies.set('hasSubscription', '', { expires: new Date(0), path: '/' });
      
      return redirectResponse;
    }
    
    // Se não tiver assinatura ativa, redirecionar para página de assinatura
    if (!hasSubscription) {
      const redirectResponse = NextResponse.redirect(new URL('/assinante', request.url));
      
      // Headers anti-cache para redirecionamento
      redirectResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private');
      redirectResponse.headers.set('Pragma', 'no-cache');
      redirectResponse.headers.set('Expires', '0');
      
      return redirectResponse;
    }
    
    // Para rotas protegidas, adicionar headers anti-cache específicos
    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    return response;
  }
  
  // Verificar rotas que requerem apenas autenticação básica
  const requiresAuth = AUTH_REQUIRED_PATHS.some(path => 
    pathname.startsWith(path)
  );
  
  if (requiresAuth) {
    // Para rotas que requerem autenticação, usar verificação padrão
    const isAuthenticated = request.headers.get('x-authenticated') === 'true' ||
                           request.cookies.get('isAuthenticated')?.value === 'true';
    
    if (!isAuthenticated) {
      const redirectResponse = NextResponse.redirect(new URL('/auth/face', request.url));
      
      // Limpar cookies de autenticação inválidos
      redirectResponse.cookies.set('isAuthenticated', '', { expires: new Date(0), path: '/' });
      redirectResponse.cookies.set('hasSubscription', '', { expires: new Date(0), path: '/' });
      
      return redirectResponse;
    }
  }
  
  // Adicionar headers de cache para evitar problemas
  const response = NextResponse.next();
  
  // Headers anti-cache mais rigorosos
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('Surrogate-Control', 'no-store');
  
  // Headers adicionais para garantir que não seja cacheado
  response.headers.set('X-Accel-Expires', '0');
  response.headers.set('X-Cache-Status', 'BYPASS');
  
  return response;
}

export const config = {
  matcher: [
    // Proteger rotas específicas (EXCLUINDO admin)
    '/galeria-assinantes',
    '/galeria-assinantes/:path*',
    '/assinante',
    '/assinante/:path*',
    '/dashboard/:path*'
  ]
};
