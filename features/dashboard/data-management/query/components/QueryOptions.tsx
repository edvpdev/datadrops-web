'use client';

import { TextField } from '@/components/form';

export default function QueryOptions() {
  return (
    <div className="rounded bg-gray-50 px-4 py-6">
      <h1 className="mb-4 text-lg font-bold">Options</h1>
      <div className="mb-4">
        <TextField
          fieldSettings={{
            label: 'Limit',
            id: 'limit',
            propKey: 'limit',
            type: 'number',
            placeholder: 'Limit',
            required: false,
            disabled: true
          }}
          value={50}
          readonly={true}
        />
      </div>

      <div className="flex justify-end">
        <button className="btn btn-primary btn-sm">Apply</button>
      </div>
    </div>
  );
}
