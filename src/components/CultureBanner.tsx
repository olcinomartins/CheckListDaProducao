import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const CultureBanner: React.FC = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 150;

      if (scrollY < fadeStart) {
        setOpacity(1);
      } else if (scrollY > fadeEnd) {
        setOpacity(0);
      } else {
        const newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
        setOpacity(newOpacity);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 md:p-6 z-50 shadow-lg border-b border-slate-700 transition-opacity duration-300"
      style={{ 
        opacity,
        pointerEvents: opacity < 0.1 ? 'none' : 'auto'
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-red-400" />
          <h3 className="font-semibold text-lg">Nossa Cultura</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm leading-relaxed">
          <div className="space-y-1">
            <p>• Excelência em tudo que fazemos</p>
            <p>• Busca constante por melhoria</p>
            <p>• Feedback como ferramenta de crescimento</p>
          </div>
          <div className="space-y-1">
            <p>• Não existe função menos importante</p>
            <p>• Privilégio de servir próximo aos comunicadores e precisamos honrar essa responsabilidade</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultureBanner;