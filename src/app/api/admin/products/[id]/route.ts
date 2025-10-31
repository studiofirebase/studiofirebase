import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb, getAdminStorage } from '@/lib/firebase-admin';

interface RouteParams {
  params: {
    id: string;
  };
}

// PUT - Atualizar produto
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    const body = await request.json();
    const { name, description, price, videoUrl, status, storageType, incrementSales } = body;
    
    // Se for apenas para incrementar vendas
    if (incrementSales) {
      const adminDb = getAdminDb();
      
      if (!adminDb) {
        console.error('[Admin] Firebase Admin não inicializado');
        return NextResponse.json({
          error: 'Firebase Admin não inicializado'
        }, { status: 500 });
      }
      
      const docRef = adminDb.collection('products').doc(id);
      
      // Verificar se o documento existe
      const doc = await docRef.get();
      if (!doc.exists) {
        return NextResponse.json({
          success: false,
          message: 'Produto não encontrado'
        }, { status: 404 });
      }
      
      const currentData = doc.data();
      const currentSales = currentData?.sales || 0;
      
      await docRef.update({
        sales: currentSales + 1,
        updatedAt: new Date()
      });
      
      return NextResponse.json({
        success: true,
        message: 'Contador de vendas atualizado',
        sales: currentSales + 1
      });
    }
    
    // Validação para atualizações normais
    if (!name || !price || !videoUrl) {
      return NextResponse.json({
        success: false,
        message: 'Nome, preço e URL do vídeo são obrigatórios'
      }, { status: 400 });
    }

    // Validação básica de URL
    try {
      new URL(videoUrl);
    } catch {
      return NextResponse.json({
        success: false,
        message: 'URL do vídeo deve ser uma URL válida'
      }, { status: 400 });
    }
    
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return NextResponse.json({
        success: false,
        message: 'Preço deve ser um número válido e maior que zero'
      }, { status: 400 });
    }

    // Validação de status
    const validStatuses = ['active', 'inactive', 'draft'];
    const productStatus = status || 'active';
    if (!validStatuses.includes(productStatus)) {
      return NextResponse.json({
        success: false,
        message: `Status deve ser um dos seguintes: ${validStatuses.join(', ')}`
      }, { status: 400 });
    }
    
    // Atualizar documento
    const adminDb = getAdminDb();
    
    if (!adminDb) {
      console.error('[Admin] Firebase Admin não inicializado');
      return NextResponse.json({
        error: 'Firebase Admin não inicializado'
      }, { status: 500 });
    }
    
    const docRef = adminDb.collection('products').doc(id);
    
    // Verificar se o documento existe
    const doc = await docRef.get();
    if (!doc.exists) {
      return NextResponse.json({
        success: false,
        message: 'Produto não encontrado'
      }, { status: 404 });
    }
    
    const updateData = {
      name: name.trim(),
      description: description?.trim() || '',
      price: parsedPrice,
      imageUrl: '', // Sempre vazio, usa thumbnail automática
      videoUrl: videoUrl.trim(),
      type: 'video',
      status: productStatus,
      storageType: storageType || 'external',
      updatedAt: new Date()
    };
    
    await docRef.update(updateData);
    
    return NextResponse.json({
      success: true,
      message: 'Produto atualizado com sucesso'
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao atualizar produto',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}

// DELETE - Excluir produto
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'ID é obrigatório'
      }, { status: 400 });
    }
    
    // Verificar se o documento existe
    const adminDb = getAdminDb();
    
    if (!adminDb) {
      console.error('[Admin] Firebase Admin não inicializado');
      return NextResponse.json({
        error: 'Firebase Admin não inicializado'
      }, { status: 500 });
    }
    
    const docRef = adminDb.collection('products').doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json({
        success: false,
        message: 'Produto não encontrado'
      }, { status: 404 });
    }

    // Excluir o documento
    await docRef.delete();
    
    return NextResponse.json({
      success: true,
      message: 'Produto excluído com sucesso'
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao excluir produto',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}

// GET - Buscar produto por ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'ID é obrigatório'
      }, { status: 400 });
    }
    
    const adminDb = getAdminDb();
    
    if (!adminDb) {
      console.error('[Admin] Firebase Admin não inicializado');
      return NextResponse.json({
        error: 'Firebase Admin não inicializado'
      }, { status: 500 });
    }
    
    const docRef = adminDb.collection('products').doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json({
        success: false,
        message: 'Produto não encontrado'
      }, { status: 404 });
    }
    
    const productData = doc.data();
    
    return NextResponse.json({
      success: true,
      product: {
        id: doc.id,
        ...productData
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Erro ao buscar produto',
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    }, { status: 500 });
  }
}
