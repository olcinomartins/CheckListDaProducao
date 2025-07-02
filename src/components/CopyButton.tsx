import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  observations: Record<string, string>;
}

const CopyButton: React.FC<CopyButtonProps> = ({ observations }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const filledObservations = Object.entries(observations)
      .filter(([_, value]) => value.trim() !== '')
      .map(([moment, value]) => {
        const lines = value.split('\n')
          .filter(line => line.trim())
          .map(line => `- ${line.trim()}`)
          .join('\n');
        return `${moment}\n${lines}`;
      })
      .join('\n\n');

    if (filledObservations.trim() === '') {
      alert('Nenhuma observação para copiar.');
      return;
    }

    try {
      await navigator.clipboard.writeText(filledObservations);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      alert('Erro ao copiar observações.');
    }
  };

  const hasObservations = Object.values(observations).some(obs => obs.trim() !== '');

  if (!hasObservations) {
    return null;
  }

  return (
    <button
      onClick={handleCopy}
      className={`
        fixed bottom-6 right-6 flex items-center gap-2 px-6 py-3 rounded-full shadow-lg font-medium transition-all duration-200 z-40
        ${copied
          ? 'bg-green-600 text-white'
          : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl'
        }
      `}
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" />
          Copiado!
        </>
      ) : (
        <>
          <Copy className="w-5 h-5" />
          Copiar Observações
        </>
      )}
    </button>
  );
};

export default CopyButton;