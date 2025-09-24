import React, { useMemo } from 'react';

type Props = {
  jsonText: string;
  onChangeJsonText: (text: string) => void;
};

// Helper to immutably set a value at a given path within an object
function setAtPath(obj: any, path: (string | number)[], value: any) {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (typeof head === 'number') {
    const arr = Array.isArray(obj) ? obj.slice() : [];
    arr[head] = setAtPath(arr[head], rest, value);
    return arr;
  } else {
    const next: any = obj && typeof obj === 'object' ? { ...obj } : {};
    next[head] = setAtPath(next[head], rest, value);
    return next;
  }
}

function toStringValue(v: any): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

export default function JsonFormEditor({ jsonText, onChangeJsonText }: Props) {
  const data = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText || '{}');
      if (parsed && typeof parsed === 'object') return parsed;
      return {} as any;
    } catch {
      return {} as any;
    }
  }, [jsonText]);

  const update = (path: (string | number)[], newVal: any) => {
    const updated = setAtPath(data, path, newVal);
    onChangeJsonText(JSON.stringify(updated, null, 2));
  };

  const removeArrayIndex = (path: (string | number)[], idx: number) => {
    const parent = path.reduce((acc: any, key) => (acc?.[key as any]), data);
    if (!Array.isArray(parent)) return;
    const next = parent.slice();
    next.splice(idx, 1);
    const newData = setAtPath(data, path, next);
    onChangeJsonText(JSON.stringify(newData, null, 2));
  };

  const addArrayItem = (path: (string | number)[], template: any = '') => {
    const parent = path.reduce((acc: any, key) => (acc?.[key as any]), data);
    const next = Array.isArray(parent) ? parent.slice() : [];
    next.push(template);
    const newData = setAtPath(data, path, next);
    onChangeJsonText(JSON.stringify(newData, null, 2));
  };

  const renderField = (value: any, path: (string | number)[], label?: string) => {
    const key = path.join('.') || 'root';

    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          {label && <label className="block text-sm font-medium">{label}</label>}
          <div className="space-y-2">
            {value.map((item, idx) => (
              <div key={idx} className="border rounded-md p-2 bg-white">
                {typeof item === 'object' && item !== null ? (
                  <div className="space-y-3">{Object.keys(item).map((k) => renderField(item[k], [...path, idx, k], k))}</div>
                ) : (
                  <input
                    className="w-full border rounded-md px-3 py-2"
                    value={toStringValue(item)}
                    onChange={(e) => update([...path, idx], e.target.value)}
                  />
                )}
                <div className="flex justify-end mt-2">
                  <button type="button" className="text-xs border rounded px-2 py-1" onClick={() => removeArrayIndex(path, idx)}>Eliminar</button>
                </div>
              </div>
            ))}
            <div>
              <button type="button" className="text-xs border rounded px-2 py-1" onClick={() => addArrayItem(path, typeof value[0] === 'object' ? {} : '')}>Agregar ítem</button>
            </div>
          </div>
        </div>
      );
    }

    if (value && typeof value === 'object') {
      return (
        <fieldset key={key} className="border rounded-md p-3 bg-gray-50">
          {label && <legend className="px-1 text-sm font-medium">{label}</legend>}
          <div className="space-y-3">
            {Object.keys(value).map((k) => renderField(value[k], [...path, k], k))}
          </div>
        </fieldset>
      );
    }

    return (
      <div key={key}>
        {label && <label className="block text-sm font-medium mb-1">{label}</label>}
        <input
          className="w-full border rounded-md px-3 py-2"
          value={toStringValue(value)}
          onChange={(e) => update(path, e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {renderField(data, [], undefined)}
    </div>
  );
}
