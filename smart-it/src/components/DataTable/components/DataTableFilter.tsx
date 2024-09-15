import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Table } from '@tanstack/react-table';

interface DataTableFiltersProps<TData> {
  table: Table<TData>;
}

export function DataTableFilters<TData>({ table }: DataTableFiltersProps<TData>) {
  const [selectedColumn, setSelectedColumn] = React.useState<string>('');
  const [globalFilter, setGlobalFilter] = React.useState<string>('');

  const columns = table.getAllColumns().filter((column) => column.getCanFilter());

  const handleGlobalFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGlobalFilter(value);
    table.setGlobalFilter(value);
  };

  const handleColumnFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (selectedColumn) {
      table.getColumn(selectedColumn)?.setFilterValue(value);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Global Search</label>
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={handleGlobalFilterChange}
          className="w-full"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Filter by Column</label>
        <Select value={selectedColumn} onValueChange={setSelectedColumn}>
          <SelectTrigger className="w-full">
            <span className="truncate">{selectedColumn || 'Select a column'}</span>
          </SelectTrigger>
          <SelectContent>
            {columns.map((column) => (
              <SelectItem key={column.id} value={column.id}>
                {column.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedColumn && (
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Search in {selectedColumn}</label>
          <Input
            placeholder={`Filter by ${selectedColumn}...`}
            value={(table.getColumn(selectedColumn)?.getFilterValue() as string) ?? ''}
            onChange={handleColumnFilterChange}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
