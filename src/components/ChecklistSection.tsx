import React from 'react';
import { Clock, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import { ChecklistItem } from '../types';

interface ChecklistSectionProps {
  moment: string;
  items: ChecklistItem[];
  observations: string;
  onItemToggle: (itemId: string) => void;
  onObservationChange: (moment: string, value: string) => void;
  animatingItems: Set<string>;
}

const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  moment,
  items,
  observations,
  onItemToggle,
  onObservationChange,
  animatingItems,
}) => {
  const [showCompleted, setShowCompleted] = React.useState(false);
  
  const pendingItems = items.filter(item => !item.checked);
  const completedItems = items.filter(item => item.checked);
  const totalItems = items.length;
  const progressPercentage = totalItems > 0 ? (completedItems.length / totalItems) * 100 : 0;

  // Group items by role
  const groupItemsByRole = (itemList: ChecklistItem[]) => {
    return itemList.reduce((acc, item) => {
      if (!acc[item.role]) {
        acc[item.role] = [];
      }
      acc[item.role].push(item);
      return acc;
    }, {} as Record<string, ChecklistItem[]>);
  };

  const pendingByRole = groupItemsByRole(pendingItems);
  const completedByRole = groupItemsByRole(completedItems);

  const renderItemsList = (itemsByRole: Record<string, ChecklistItem[]>, isCompleted = false) => {
    return Object.entries(itemsByRole).map(([role, roleItems]) => (
      <div key={role} className="space-y-3">
        <h3 className="font-semibold text-lg text-slate-200 border-b border-slate-600 pb-2">
          {role}
        </h3>
        <div className="space-y-2">
          {roleItems.map((item) => {
            const isAnimating = animatingItems.has(item.id);
            
            return (
              <div
                key={item.id}
                className={`
                  flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-all duration-200
                  ${isAnimating ? 'completing-animation' : ''}
                  ${item.checked
                    ? 'border-green-600 bg-green-900/30 text-green-300'
                    : 'border-slate-600 bg-slate-800 hover:border-slate-500 hover:bg-slate-700 text-slate-200'
                  }
                `}
                onClick={() => onItemToggle(item.id)}
              >
                <div className="flex-shrink-0 mt-0.5">
                  {item.checked ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <span 
                  className={`
                    text-sm leading-relaxed flex-1
                    ${item.checked ? 'line-through opacity-75' : ''}
                  `}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white p-6">
        <div className="flex items-center gap-3 mb-3">
          <Clock className="w-6 h-6" />
          <h2 className="text-xl font-semibold">{moment}</h2>
        </div>
        
        {totalItems > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>{completedItems.length}/{totalItems} concluídos</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {totalItems === 0 ? (
          <p className="text-slate-400 text-center py-8">
            Nenhuma atividade para este momento nos cargos selecionados.
          </p>
        ) : (
          <div className="space-y-6">
            {/* Pending Items */}
            {pendingItems.length > 0 && (
              <div className="space-y-6">
                <h3 className="font-semibold text-lg text-slate-200 flex items-center gap-2">
                  <Circle className="w-5 h-5 text-slate-400" />
                  Atividades Pendentes ({pendingItems.length})
                </h3>
                {renderItemsList(pendingByRole)}
              </div>
            )}

            {/* Completed Items */}
            {completedItems.length > 0 && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowCompleted(!showCompleted)}
                  className="flex items-center gap-2 font-semibold text-lg text-green-400 hover:text-green-300 transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Atividades Realizadas ({completedItems.length})
                  {showCompleted ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                
                {showCompleted && (
                  <div className="space-y-6 pl-4 border-l-2 border-green-600 fade-in">
                    {renderItemsList(completedByRole, true)}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Observations */}
        <div className="mt-6 pt-6 border-t border-slate-600">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Observações sobre {moment}
          </label>
          <textarea
            value={observations}
            onChange={(e) => onObservationChange(moment, e.target.value)}
            placeholder={`Adicione suas observações sobre ${moment}...`}
            className="w-full p-3 border border-slate-600 bg-slate-700 text-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-[80px] text-sm placeholder-slate-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ChecklistSection;