'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProfileError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[ProfilePage]', error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '16px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <p style={{ color: '#666', fontSize: '16px' }}>
        無法載入頁面資料，請稍後再試。
      </p>
      <button
        onClick={reset}
        style={{
          padding: '10px 24px',
          borderRadius: '9999px',
          border: '1px solid #171717',
          background: 'transparent',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        重新載入
      </button>
    </div>
  );
}
