'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <VerifyContent />
    </Suspense>
  );
}

function VerifyContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Vérification en cours...');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('Token manquant');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('Email vérifié avec succès!');
        } else {
          setStatus('error');
          setMessage(data.error || 'Erreur lors de la vérification');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Erreur lors de la vérification');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="text-center">
          {status === 'loading' && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          )}
          {status === 'success' && (
            <div className="text-green-500 text-xl mb-4">✓</div>
          )}
          {status === 'error' && (
            <div className="text-red-500 text-xl mb-4">✗</div>
          )}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Vérification de l'email
          </h2>
          <p className="text-gray-600">{message}</p>
          {status !== 'loading' && (
            <a
              href="/login"
              className="mt-4 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Aller à la page de connexion
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
