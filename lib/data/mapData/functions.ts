import fs from 'fs'
import { RawStaticColliderData, Collider } from "./types";

export function loadColliders(name:string) {
  let ds:string;
  try {
    ds = fs.readFileSync(`./raw/${name.toLowerCase()}-colliders.json`, 'utf-8')
  } catch(err) {
    throw new Error("Failed to load colliders for " + name)
  }
  let d: RawStaticColliderData[] = JSON.parse(ds);
  let rd: Collider[] = d.map((sd) => new Collider(sd));
  return rd;
}