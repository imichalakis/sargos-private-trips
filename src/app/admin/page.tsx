"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Boat } from "@/types/boat";

export default function AdminPage() {
  return (
    <Suspense>
      <AdminContent />
    </Suspense>
  );
}

function AdminContent() {
  const search = useSearchParams();
  const [adminKey, setAdminKey] = useState("");
  const [boats, setBoats] = useState<Boat[]>([]);
  const [editing, setEditing] = useState<
    (Partial<Omit<Boat, "features">> & { features: string | string[] }) | null
  >(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const key = search.get("key");
    if (key) {
      localStorage.setItem("adminKey", key);
      setAdminKey(key);
    } else {
      const stored = localStorage.getItem("adminKey");
      if (stored) setAdminKey(stored);
    }
  }, [search]);

  async function loadBoats(key: string) {
    const res = await fetch("/api/boats", {
      headers: { "x-admin-key": key },
    });
    if (res.status === 401) {
      setAuthorized(false);
      return;
    }
    const data = await res.json();
    setBoats(data);
    setAuthorized(true);
  }

  useEffect(() => {
    if (adminKey) loadBoats(adminKey);
  }, [adminKey]);

  if (!authorized) {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center space-x-2">
          <input
            className="border px-2 py-1"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Admin Key"
          />
          <button
            className="border px-2 py-1"
            onClick={() => {
              localStorage.setItem("adminKey", adminKey);
              loadBoats(adminKey);
            }}
          >
            Save
          </button>
        </div>
        <p>Not authorized.</p>
      </div>
    );
  }

  function startCreate() {
    setEditing({
      name: "",
      description: "",
      capacity: 0,
      pricePerDay: 0,
      features: [],
      image: "",
      isActive: true,
    });
  }

  async function saveBoat() {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const url = editing.id ? `/api/boats/${editing.id}` : "/api/boats";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": adminKey,
      },
      body: JSON.stringify({
        ...editing,
        features: Array.isArray(editing.features)
          ? editing.features
          : String(editing.features || "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
      }),
    });
    if (res.ok) {
      setEditing(null);
      loadBoats(adminKey);
    }
  }

  async function deleteBoat(id: string) {
    if (!confirm("Delete boat?")) return;
    await fetch(`/api/boats/${id}`, {
      method: "DELETE",
      headers: { "x-admin-key": adminKey },
    });
    loadBoats(adminKey);
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <input
          className="border px-2 py-1"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          placeholder="Admin Key"
        />
        <button
          className="border px-2 py-1"
          onClick={() => {
            localStorage.setItem("adminKey", adminKey);
            loadBoats(adminKey);
          }}
        >
          Save
        </button>
        <button className="border px-2 py-1" onClick={startCreate}>
          New Boat
        </button>
      </div>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Slug</th>
            <th className="border px-2">Price</th>
            <th className="border px-2">Active</th>
            <th className="border px-2"></th>
          </tr>
        </thead>
        <tbody>
          {boats.map((b) => (
            <tr key={b.id}>
              <td className="border px-2">{b.name}</td>
              <td className="border px-2">{b.slug}</td>
              <td className="border px-2">{b.pricePerDay}</td>
              <td className="border px-2">{b.isActive ? "Yes" : "No"}</td>
              <td className="border px-2 space-x-2">
                <button className="underline" onClick={() => setEditing(b)}>
                  Edit
                </button>
                <button className="underline" onClick={() => deleteBoat(b.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <div className="border p-4 space-y-2">
          <input
            className="border w-full px-2 py-1"
            value={editing.name || ""}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            placeholder="Name"
          />
          <textarea
            className="border w-full px-2 py-1"
            value={editing.description || ""}
            onChange={(e) =>
              setEditing({ ...editing, description: e.target.value })
            }
            placeholder="Description"
          />
          <input
            className="border w-full px-2 py-1"
            type="number"
            value={editing.capacity ?? 0}
            onChange={(e) =>
              setEditing({ ...editing, capacity: Number(e.target.value) })
            }
            placeholder="Capacity"
          />
          <input
            className="border w-full px-2 py-1"
            type="number"
            value={editing.pricePerDay ?? 0}
            onChange={(e) =>
              setEditing({ ...editing, pricePerDay: Number(e.target.value) })
            }
            placeholder="Price per day"
          />
          <input
            className="border w-full px-2 py-1"
            value={
              Array.isArray(editing.features)
                ? editing.features.join(",")
                : typeof editing.features === "string"
                ? editing.features
                : ""
            }
            onChange={(e) =>
              setEditing({ ...editing, features: e.target.value })
            }
            placeholder="Features (comma separated)"
          />
          <input
            className="border w-full px-2 py-1"
            value={editing.image || ""}
            onChange={(e) => setEditing({ ...editing, image: e.target.value })}
            placeholder="Image"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={editing.isActive ?? true}
              onChange={(e) =>
                setEditing({ ...editing, isActive: e.target.checked })
              }
            />
            <span>Active</span>
          </label>
          <div className="space-x-2">
            <button className="border px-2 py-1" onClick={saveBoat}>
              Save
            </button>
            <button
              className="border px-2 py-1"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
