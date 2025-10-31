
'use client';

import { useEffect } from 'react';

export default function AuthCallbackPage() {
  useEffect(() => {
    if (window.opener) {
      const params = new URLSearchParams(window.location.search);
      const data = {
        success: params.get('success'),
        error: params.get('error'),
        message: params.get('message'),
        platform: params.get('platform'),
        username: params.get('username') || undefined,
      };
      window.opener.postMessage(data, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <p>Autenticando, por favor aguarde...</p>
    </div>
  );
}
