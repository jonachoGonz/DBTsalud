import React, { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  jsonText: string;
  onChangeJsonText: (text: string) => void;
};

// Helper to immutably set a value at a given path within an object
function setAtPath(obj: any, path: (string | number)[], value: any) {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (typeof head === "number") {
    const arr = Array.isArray(obj) ? obj.slice() : [];
    arr[head] = setAtPath(arr[head], rest, value);
    return arr;
  } else {
    const next: any = obj && typeof obj === "object" ? { ...obj } : {};
    next[head] = setAtPath(next[head], rest, value);
    return next;
  }
}

function toStringValue(v: any): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v);
}

const SUPABASE_BUCKET = "images";

function looksLikeUrl(v: string) {
  return typeof v === "string" && /^(https?:)?\/\//.test(v);
}

function isImageKey(label: string | undefined, path: (string | number)[]) {
  const last = String(label ?? path[path.length - 1] ?? "").toLowerCase();
  return (
    last.includes("image") ||
    last.includes("logo") ||
    last.includes("icon") ||
    last.includes("avatar") ||
    last.includes("banner")
  );
}

export default function JsonFormEditor({ jsonText, onChangeJsonText }: Props) {
  const data = useMemo(() => {
    try {
      const parsed = JSON.parse(jsonText || "{}");
      if (parsed && typeof parsed === "object") return parsed;
      return {} as any;
    } catch {
      return {} as any;
    }
  }, [jsonText]);

  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  const setUploadingFor = (key: string, val: boolean) =>
    setUploading((s) => ({ ...s, [key]: val }));

  const update = (path: (string | number)[], newVal: any) => {
    const updated = setAtPath(data, path, newVal);
    onChangeJsonText(JSON.stringify(updated, null, 2));
  };

  const removeArrayIndex = (path: (string | number)[], idx: number) => {
    const parent = path.reduce((acc: any, key) => acc?.[key as any], data);
    if (!Array.isArray(parent)) return;
    const next = parent.slice();
    next.splice(idx, 1);
    const newData = setAtPath(data, path, next);
    onChangeJsonText(JSON.stringify(newData, null, 2));
  };

  const addArrayItem = (path: (string | number)[], template: any = "") => {
    const parent = path.reduce((acc: any, key) => acc?.[key as any], data);
    const next = Array.isArray(parent) ? parent.slice() : [];
    next.push(template);
    const newData = setAtPath(data, path, next);
    onChangeJsonText(JSON.stringify(newData, null, 2));
  };

  async function uploadFileAndSet(
    path: (string | number)[],
    file: File,
    key: string,
  ) {
    try {
      setUploadingFor(key, true);
      const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
      const safeName = `${crypto.randomUUID?.() || Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const d = new Date();
      const folder = `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
      const objectPath = `${folder}/${safeName}`;

      const { error: upErr } = await supabase
        .storage
        .from(SUPABASE_BUCKET)
        .upload(objectPath, file, {
          cacheControl: "3600",
          contentType: file.type || `image/${ext}`,
          upsert: false,
        });
      if (upErr) {
        const msg = upErr.message || String(upErr);
        alert(
          `Error subiendo archivo: ${msg}. Asegúrate de tener un bucket público llamado "${SUPABASE_BUCKET}" en Supabase Storage.`,
        );
        return;
      }
      const { data: pub } = supabase.storage
        .from(SUPABASE_BUCKET)
        .getPublicUrl(objectPath);
      const url = pub.publicUrl;
      update(path, url);
    } catch (e: any) {
      alert(`Error subiendo archivo: ${e?.message || e}`);
    } finally {
      setUploadingFor(key, false);
    }
  }

  function humanLabel(raw?: string) {
    if (!raw) return raw;
    if (raw === "backgroundImage") return "Imagen de fondo";
    if (raw === "cta1Link") return "cta1 link";
    if (raw === "cta2Link") return "cta2 link";
    return raw;
  }

  const renderField = (
    value: any,
    path: (string | number)[],
    label?: string,
  ) => {
    const key = path.join(".") || "root";

    if (Array.isArray(value)) {
      return (
        <div key={key} className="space-y-2">
          {label && (
            <label className="block text-sm font-medium">{humanLabel(label)}</label>
          )}
          <div className="space-y-2 flex justify-between flex-wrap flex-auto w-auto gap-x-3 ">
            {value.map((item, idx) => (
              <div key={idx} className="border rounded-md p-2 bg-white w-auto w-auto md:w-[450px]">
                {typeof item === "object" && item !== null ? (
                  <div className="space-y-3">
                    {Object.keys(item).map((k) =>
                      renderField(item[k], [...path, idx, k], k),
                    )}
                  </div>
                ) : (
                  <input
                    className="w-full border rounded-md px-3 py-2"
                    value={toStringValue(item)}
                    onChange={(e) => update([...path, idx], e.target.value)}
                  />
                )}
                <div className="flex justify-end mt-2">
                  <button
                    type="button"
                    className="text-xs  rounded px-2 py-1 text-red-50 bg-red-500"
                    onClick={() => removeArrayIndex(path, idx)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
            <div>
              <button
                type="button"
                className="text-xs rounded px-2 py-1 bg-indigo-500 text-blue-50"
                onClick={() =>
                  addArrayItem(path, typeof value[0] === "object" ? {} : "")
                }
              >
                Agregar ítem
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (value && typeof value === "object") {
      const keys = Object.keys(value);
      let ordered = keys;
      if (path.length === 0) {
        const headerOrder = [
          "title1",
          "title2",
          "subtitle1",
          "subtitle2",
          "cta1",
          "cta1Link",
          "cta2",
          "cta2Link",
          "backgroundImage",
        ];
        const present = headerOrder.filter((k) => keys.includes(k));
        const rest = keys.filter((k) => !headerOrder.includes(k));
        ordered = [...present, ...rest];
      }
      return (
        <fieldset key={key} className="rounded-md p-3 bg-gray-50">
          {label && (
            <legend className="px-1 text-sm font-medium">{humanLabel(label)}</legend>
          )}
          <div className="space-y-3">
            {ordered.map((k) => renderField(value[k], [...path, k], k))}
          </div>
        </fieldset>
      );
    }

    if (isImageKey(label, path)) {
      return (
        <div key={key} className="">
          {label && (
            <label className="block text-sm font-medium mb-1">{humanLabel(label)}</label>
          )}
          {looksLikeUrl(String(value || "")) && (
            <div className="mb-2">
              <a
                href={String(value)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                Abrir imagen en nueva pestaña
              </a>
            </div>
          )}
          <div className="border border-gray-200 rounded-md bg-white p-3">
            <input
              type="file"
              accept="image/*"
              disabled={!!uploading[key]}
              onChange={(e) => {
                const file = e.currentTarget.files?.[0];
                if (file) uploadFileAndSet(path, file, key);
              }}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
          <div className="mt-2">
            <input
              className="w-full border rounded-md px-3 py-2"
              placeholder="o pega una URL de imagen"
              value={toStringValue(value)}
              onChange={(e) => update(path, e.target.value)}
            />
          </div>
        </div>
      );
    }

    return (
      <div key={key}>
        {label && (
          <label className="block text-sm font-medium mb-1">{humanLabel(label)}</label>
        )}
        <input
          className="w-full border rounded-md px-3 py-2"
          value={toStringValue(value)}
          onChange={(e) => update(path, e.target.value)}
        />
      </div>
    );
  };

  return <div className="space-y-3">{renderField(data, [], undefined)}</div>;
}
