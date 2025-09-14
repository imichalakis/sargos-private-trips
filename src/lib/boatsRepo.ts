import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { Boat } from "@/types/boat";
import slugify from "./slugify";

const dataPath = path.join(process.cwd(), "data", "boats.json");

let lock: Promise<void> = Promise.resolve();

async function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const previous = lock;
  let release: () => void = () => {};
  lock = new Promise((res) => (release = res));
  await previous;
  try {
    return await fn();
  } finally {
    release();
  }
}

async function readBoats(): Promise<Boat[]> {
  const raw = await fs.readFile(dataPath, "utf8");
  return JSON.parse(raw) as Boat[];
}

async function writeBoats(boats: Boat[]): Promise<void> {
  await fs.writeFile(dataPath, JSON.stringify(boats, null, 2));
}

export async function getAllBoats(): Promise<Boat[]> {
  return withLock(readBoats);
}

export async function getBoatBySlug(slug: string): Promise<Boat | undefined> {
  const boats = await getAllBoats();
  return boats.find((b) => b.slug === slug);
}

type NewBoat = Omit<Boat, "id" | "slug"> & { slug?: string };

export async function createBoat(data: NewBoat): Promise<Boat> {
  return withLock(async () => {
    const boats = await readBoats();
    const id = randomUUID();
    const slug = slugify(data.slug || data.name, boats.map((b) => b.slug));
    const boat: Boat = { id, slug, ...data, isActive: data.isActive ?? true };
    boats.push(boat);
    await writeBoats(boats);
    return boat;
  });
}

export async function updateBoat(
  id: string,
  patch: Partial<Boat>
): Promise<Boat | undefined> {
  return withLock(async () => {
    const boats = await readBoats();
    const index = boats.findIndex((b) => b.id === id);
    if (index === -1) return undefined;
    const existing = boats[index];
    const slugs = boats.filter((b) => b.id !== id).map((b) => b.slug);
    const updated: Boat = {
      ...existing,
      ...patch,
      slug: slugify(patch.slug || existing.name, slugs),
    };
    boats[index] = updated;
    await writeBoats(boats);
    return updated;
  });
}

export async function deleteBoat(id: string): Promise<boolean> {
  return withLock(async () => {
    const boats = await readBoats();
    const index = boats.findIndex((b) => b.id === id);
    if (index === -1) return false;
    boats.splice(index, 1);
    await writeBoats(boats);
    return true;
  });
}
