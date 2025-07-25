'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import { ColDef, ModuleRegistry, ValueFormatterParams } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/redux/store';
import { fetchStocks } from '@/store/redux/slices/stockSlice';
import { saveScreen } from '@/services/screenService';
import { X } from 'lucide-react';

import { AgGridReact } from 'ag-grid-react';
import { agGridCustomTheme } from '@/theme/agGridCustomTheme';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { toast } from 'react-toastify';

ModuleRegistry.registerModules([AllCommunityModule]);

type Props = {
  title?: string;
  count?: number;
  firebaseIdToken: string;
  query: string;
};
interface AgGridTheme {
  addToDocument?: () => void;
}


const formatNumber = (num: number | string | null | undefined): string => {
  const parsed = typeof num === 'number' ? num : parseFloat(String(num));
  if (isNaN(parsed)) return 'N/A';
  return parsed.toFixed(2);
};

const AGridTable: React.FC<Props> = ({
  title = 'Top Stocks',
  firebaseIdToken,
  query,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: stocks } = useSelector((state: RootState) => state.stocks);
  const [screenTitle, setScreenTitle] = useState(title);
  const [screenDescription, setScreenDescription] = useState('Saved screen from query result');
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const columnDialogRef = useRef<HTMLDialogElement | null>(null);
  const [allColumns, setAllColumns] = useState<ColDef[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (firebaseIdToken) {
      dispatch(fetchStocks({ token: firebaseIdToken, query }));
    }
  }, [firebaseIdToken, query, dispatch]);

  useEffect(() => {
    if (stocks && stocks.length > 0) {
      const sample = stocks[0];
      const cols: ColDef[] = Object.keys(sample).map((key) => ({
        field: key,
        headerName: key
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase()),
        valueFormatter: (params: ValueFormatterParams) => {
          const value = params.value;
          if (typeof value === 'number') return formatNumber(value);
          if (value === null || value === undefined) return 'N/A';
          return value;
        },
        cellClass: (params: ValueFormatterParams) => {
          const value = params.value;
          if (typeof value === 'number') {
            if (value > 0) return 'text-green-600 font-medium';
            if (value < 0) return 'text-red-600 font-medium';
          }
          return '';
        },
        pinned: key === 'name' ? 'left' : undefined,
      }));

      setAllColumns(cols);

      const visibility = cols.reduce((acc, col) => {
        acc[col.field as string] = true;
        return acc;
      }, {} as Record<string, boolean>);

      setVisibleColumns(visibility);
    }
  }, [stocks]);

  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    filter: true,
    resizable: true,
    editable: false,
  }), []);

  const colDefs = useMemo<ColDef[]>(() => {
    if (allColumns.length === 0) return [];
    const sorted = allColumns.sort((a, b) => {
      if (a.field === 'name') return -1;
      if (b.field === 'name') return 1;
      return 0;
    });

    return sorted.filter((col) => visibleColumns[col.field as string]);
  }, [allColumns, visibleColumns]);

  const handleSave = async () => {
    try {
      await saveScreen(firebaseIdToken, {
        title: screenTitle,
        description: screenDescription,
        screen_query: query,
      });
    
      toast.success('Screen saved successfully!');
      dialogRef.current?.close();
    } catch (error: unknown) {
      toast.error('Failed to save screen. Check console.');
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error('Unknown error saving screen');
  }
    }
  };

  const toggleColumn = (field: string) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [field]: field === 'name' ? true : !prev[field],
    }));
  };

   const gridRef = useRef<AgGridReact>(null);

useEffect(() => {
  if (gridRef.current) {
    (agGridCustomTheme as AgGridTheme).addToDocument?.(); // inject theme CSS variables
  }
}, []);


  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <div className="flex gap-4 items-center">
          {stocks?.length > 0 && (
            <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-sm border border-blue-300">
              {stocks.length} Stocks
            </span>
          )}
          <button
            onClick={() => columnDialogRef.current?.showModal()}
            className="bg-gray-100 hover:bg-gray-200 text-sm font-medium px-3 py-1 rounded border"
          >
            🧩 Select Columns
          </button>
          <button
            onClick={() => dialogRef.current?.showModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition"
          >
            💾 Save Screen
          </button>
        </div>
      </div>

      {/* AG Grid Table */}
      <div className="ag-theme-quartz shadow border border-gray-200 rounded-xl overflow-hidden" style={{ height: 600, width: '100%' }}>
        <AgGridReact
        ref={gridRef}
          rowData={stocks || []}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination
          animateRows
        />
      </div>

      {/* Column Toggle Modal */}
      <dialog ref={columnDialogRef} className="modal">
        <div className="modal-box w-full max-w-md bg-white rounded-xl border border-gray-300 p-6 shadow-lg relative">
          <form method="dialog" className="absolute top-2 right-2">
            <button className="btn btn-sm btn-circle btn-ghost">
              <X className="w-4 h-4" />
            </button>
          </form>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🧩 Select Visible Columns</h3>
          <div className="h-[400px] overflow-y-auto pr-2 space-y-2">
            {allColumns.map((col) => (
              <label key={col.field} className="flex items-center text-sm gap-2">
                <input
                  type="checkbox"
                  checked={visibleColumns[col.field as string]}
                  disabled={col.field === 'name'}
                  onChange={() => toggleColumn(col.field as string)}
                />
                <span>{col.headerName}</span>
              </label>
            ))}
          </div>
          <div className="modal-action mt-4 flex justify-end">
            <form method="dialog">
              <button className="btn px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">Done</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Save Screen Modal */}
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box w-full max-w-md bg-white rounded-xl border border-gray-300 p-6 shadow-lg relative">
          <form method="dialog" className="absolute top-2 right-2">
            <button className="btn btn-sm btn-circle btn-ghost">
              <X className="w-4 h-4" />
            </button>
          </form>
          <h3 className="text-xl font-semibold text-blue-700 mb-4">💾 Save This Screen</h3>

          <div className="form-control mb-4">
            <label className="label text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={screenTitle}
              onChange={(e) => setScreenTitle(e.target.value)}
            />
          </div>

          <div className="form-control mb-4">
            <label className="label text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={screenDescription}
              onChange={(e) => setScreenDescription(e.target.value)}
            />
          </div>

          <div className="modal-action mt-4 flex justify-end gap-2">
            <form method="dialog">
              <button className="btn px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm rounded-md">Cancel</button>
            </form>
            <button onClick={handleSave} className="btn px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">✅ Save</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AGridTable;
