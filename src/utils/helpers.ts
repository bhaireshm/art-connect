import type { AnyObj } from "@/types";
import { isEmpty } from "@bhairesh/ez.js";
import { createHmac, randomBytes } from "crypto";

/**
 * Uses deep merge way to merge objects.
 *
 * @param {object} obj1
 * @param {object} obj2
 * @returns {object} merged object
 */
export function mergeObjects<T extends object>(obj1: AnyObj, obj2: AnyObj): T {
  const o1 = { ...obj1 };
  const o2 = { ...obj2 };

  for (const key in o1)
    if (Object.hasOwn(o1, key)) {
      if (Array.isArray(o2[key]) && Array.isArray(o1[key])) {
        o2[key] = [...o1[key], ...o2[key]];
        // eslint-disable-next-line no-continue
        continue;
      }
      if (typeof o2[key] === "object" && typeof o1[key] === "object") {
        o2[key] = mergeObjects(o1[key], o2[key]);
        // eslint-disable-next-line no-continue
        continue;
      }
      o2[key] = o1[key];
    }

  return o2 as T;
}

/**
 * Converts each word's first letter into uppercase.
 *
 * @param {string} str - The input string that needs to be converted to camel case.
 * @param {boolean} removeSpecialChars - A flag to indicate whether to remove special characters from the string. Default is `false`.
 * @returns {string} - Returns a new string where each word's first letter is converted to uppercase.
 */
export function camelCase(str: string, removeSpecialChars: boolean = false): string {
  str = str.replace(/(^|\s)\S/g, (t) => t.toUpperCase());
  if (removeSpecialChars) str = str.replace(/[-_\s]+/g, "");
  return str;
}

export function isDevelopment(MODE = "") {
  // process?.env?.MODE ||
  return ["development", "test", "dev"].some((mode) => mode === String(MODE).toLowerCase());
}

export function hashData(data: string, salt?: string): string {
  if (!salt) salt = randomBytes(16).toString("hex");
  return createHmac("sha256", salt).update(data).digest("hex");
}

export function searchParamsToObject(searchParams: URLSearchParams) {
  const obj = Object.fromEntries(searchParams.entries());
  if (isEmpty(obj)) return {};
  return Object.entries(obj)
    ?.reduce((p: AnyObj, [k, v]) => ({ ...p, [k]: decodeURIComponent(v) }), {});
}