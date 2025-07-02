import React from 'react';
import { Users } from 'lucide-react';

interface RoleSelectorProps {
  selectedRoles: string[];
  onRoleChange: (roles: string[]) => void;
  availableRoles: string[];
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  selectedRoles, 
  onRoleChange, 
  availableRoles 
}) => {
  const handleRoleToggle = (role: string) => {
    if (selectedRoles.includes(role)) {
      onRoleChange(selectedRoles.filter(r => r !== role));
    } else {
      onRoleChange([...selectedRoles, role]);
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-semibold text-slate-200">Selecione seus Cargos</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableRoles.map((role) => (
          <label
            key={role}
            className={`
              flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${selectedRoles.includes(role)
                ? 'border-blue-500 bg-blue-900/30 text-blue-300'
                : 'border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-600'
              }
            `}
          >
            <input
              type="checkbox"
              checked={selectedRoles.includes(role)}
              onChange={() => handleRoleToggle(role)}
              className="sr-only"
            />
            <span className="font-medium text-center">{role}</span>
          </label>
        ))}
      </div>
      
      {selectedRoles.length > 0 && (
        <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-600">
          <p className="text-sm text-blue-300">
            <strong>{selectedRoles.length}</strong> cargo(s) selecionado(s): {selectedRoles.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
};

export default RoleSelector;