import React from 'react';
import { Settings, ChevronDown, Check } from 'lucide-react';

type ColumnOption = {
  key: string;
  label: string;
};

type ColumnConfiguratorProps = {
  theme: any;
  show: boolean;
  toggle: () => void;
  columnOptions: ColumnOption[];
  visibleColumns: Record<string, boolean>;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

const ColumnConfigurator: React.FC<ColumnConfiguratorProps> = ({
  theme,
  show,
  toggle,
  columnOptions,
  visibleColumns,
  setVisibleColumns
}) => {
  return (
    <div className="flex justify-end mb-6">
      <div className="relative">
        <button
          onClick={toggle}
          className={`flex items-center gap-2 px-4 py-2 ${theme.accent} rounded-xl text-sm font-medium transition-colors hover:opacity-80`}
        >
          <Settings className="w-4 h-4" />
          Configure Columns
          <ChevronDown className="w-4 h-4" />
        </button>

        {show && (
          <div className={`absolute right-0 top-full mt-2 w-64 ${theme.surface} ${theme.border} border rounded-xl shadow-2xl z-10`}>
            <div className="p-4">
              <h3 className="text-sm font-medium mb-4">Select Columns</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {columnOptions.map(option => (
                  <label key={option.key} className={`flex items-center gap-3 cursor-pointer hover:${theme.surfaceHover} p-2 rounded-lg transition-colors`}>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={visibleColumns[option.key]}
                        onChange={(e) =>
                          setVisibleColumns(prev => ({
                            ...prev,
                            [option.key]: e.target.checked
                          }))
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors ${
                          visibleColumns[option.key]
                            ? 'bg-emerald-500 border-emerald-500'
                            : `border-gray-500 ${theme.surfaceHover}`
                        }`}
                      >
                        {visibleColumns[option.key] && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnConfigurator;
