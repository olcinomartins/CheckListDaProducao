import React, { useState, useMemo } from 'react';
import { CheckSquare } from 'lucide-react';
import CultureBanner from './components/CultureBanner';
import RoleSelector from './components/RoleSelector';
import ChecklistSection from './components/ChecklistSection';
import CopyButton from './components/CopyButton';
import { useActivities } from './hooks/useActivities';
import { ChecklistItem } from './types';

function App() {
  const { activities, loading, error } = useActivities();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [observations, setObservations] = useState<Record<string, string>>({});
  const [animatingItems, setAnimatingItems] = useState<Set<string>>(new Set());

  // Generate checklist items from selected roles
  const checklistItems = useMemo(() => {
    const items: ChecklistItem[] = [];
    
    selectedRoles.forEach(role => {
      if (activities[role]) {
        Object.entries(activities[role]).forEach(([moment, tasks]) => {
          tasks.forEach((task, index) => {
            items.push({
              id: `${role}-${moment}-${index}`,
              text: task,
              checked: checkedItems.has(`${role}-${moment}-${index}`),
              role,
              moment,
            });
          });
        });
      }
    });
    
    return items;
  }, [selectedRoles, activities, checkedItems]);

  // Group items by moment
  const itemsByMoment = useMemo(() => {
    const grouped: Record<string, ChecklistItem[]> = {};
    
    checklistItems.forEach(item => {
      if (!grouped[item.moment]) {
        grouped[item.moment] = [];
      }
      grouped[item.moment].push(item);
    });
    
    return grouped;
  }, [checklistItems]);

  // Get unique moments in order
  const moments = useMemo(() => {
    const momentOrder = [
      'Reunião de equipe (inicial)',
      'Pré-culto',
      'Louvor',
      'Oração',
      'Boas vindas / Avisos:',
      'Generosidade:',
      'Palavra / Ministração / Apelo:',
      'Encerramento',
      'Reunião de equipe (final)'
    ];
    
    return momentOrder.filter(moment => itemsByMoment[moment]);
  }, [itemsByMoment]);

  const handleItemToggle = (itemId: string) => {
    const isCurrentlyChecked = checkedItems.has(itemId);
    
    if (!isCurrentlyChecked) {
      // Add animation class
      setAnimatingItems(prev => new Set(prev).add(itemId));
      
      // After animation, update the checked state
      setTimeout(() => {
        setCheckedItems(prev => {
          const newCheckedItems = new Set(prev);
          newCheckedItems.add(itemId);
          return newCheckedItems;
        });
        
        // Remove animation class
        setTimeout(() => {
          setAnimatingItems(prev => {
            const newAnimating = new Set(prev);
            newAnimating.delete(itemId);
            return newAnimating;
          });
        }, 100);
      }, 600);
    } else {
      // Unchecking - immediate
      const newCheckedItems = new Set(checkedItems);
      newCheckedItems.delete(itemId);
      setCheckedItems(newCheckedItems);
    }
  };

  const handleObservationChange = (moment: string, value: string) => {
    setObservations(prev => ({
      ...prev,
      [moment]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Carregando checklist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="text-xl font-semibold mb-2">Erro</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const availableRoles = Object.keys(activities);

  return (
    <div className="min-h-screen bg-slate-900">
      <CultureBanner />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckSquare className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
              Checklist da Produção
            </h1>
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Somos uma equipe de excelência, pontuais e focados.
          </p>
        </div>

        {/* Role Selection */}
        <div className="mb-8">
          <RoleSelector
            selectedRoles={selectedRoles}
            onRoleChange={setSelectedRoles}
            availableRoles={availableRoles}
          />
        </div>

        {/* Checklists */}
        {selectedRoles.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-slate-800 rounded-xl shadow-lg p-8 border border-slate-700">
              <CheckSquare className="w-16 h-16 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                Selecione seus cargos
              </h3>
              <p className="text-slate-400">
                Escolha um ou mais cargos acima para visualizar os checklists correspondentes.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {moments.map(moment => (
              <ChecklistSection
                key={moment}
                moment={moment}
                items={itemsByMoment[moment] || []}
                observations={observations[moment] || ''}
                onItemToggle={handleItemToggle}
                onObservationChange={handleObservationChange}
                animatingItems={animatingItems}
              />
            ))}
          </div>
        )}

        {/* Copy Button */}
        {selectedRoles.length > 0 && (
          <CopyButton observations={observations} />
        )}
      </div>
    </div>
  );
}

export default App;