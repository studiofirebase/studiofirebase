import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Debug logs para diagnosticar o problema
  console.log('[Middleware] Path:', pathname)
  console.log('[Middleware] Headers:', request.headers.get('referer'))
  
  // 🔒 CRÍTICO: NÃO aplicar middleware para rotas do admin - deixar o layout do admin gerenciar
  if (pathname.startsWith('/admin')) {
    console.log('[Middleware] Rota do admin detectada, ignorando middleware completamente:', pathname)
    return NextResponse.next()
  }

  // Proteção para galeria de assinantes - LIBERADA EM DESENVOLVIMENTO
  if (pathname.startsWith('/galeria-assinantes')) {
    console.log('[Middleware] Galeria assinantes - acesso liberado (componente gerencia)')
    return NextResponse.next()
  }

  // Proteção para rotas de perfil
  if (pathname.startsWith('/perfil')) {
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'
    
    console.log('[Middleware] Perfil - Auth:', isAuthenticated)
    
    if (!isAuthenticated) {
      console.log('[Middleware] Redirecionando para /auth/face - não autenticado')
      return NextResponse.redirect(new URL('/auth/face', request.url))
    }
  }

  // Proteção para rotas de dashboard
  if (pathname.startsWith('/dashboard')) {
    const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'
    const hasSubscription = request.cookies.get('hasSubscription')?.value === 'true'
    
    console.log('[Middleware] Dashboard - Auth:', isAuthenticated, 'Subscription:', hasSubscription)
    
    if (!isAuthenticated) {
      console.log('[Middleware] Redirecionando para /auth/face - não autenticado')
      return NextResponse.redirect(new URL('/auth/face', request.url))
    }
    
    if (!hasSubscription) {
      console.log('[Middleware] Redirecionando para /assinante - sem assinatura')
      return NextResponse.redirect(new URL('/assinante', request.url))
    }
  }

  // LOJA ONLINE: Permitir acesso público para visualização
  // Autenticação será verificada apenas no momento da compra


  return NextResponse.next()
}

export const config = {
  matcher: [
    '/galeria-assinantes/:path*',
    '/perfil/:path*',
    '/dashboard/:path*',
    // '/loja', // Removido - loja deve ser pública para visualização
  ],
}
