import { PropertiesType } from "@/models/Property";
// FIXME
// Warning: Only plain objects can be passed to Client Components from Server Components. Objects with toJSON methods are not supported. Convert it manually to a simple value before passing it to props. {_id: ..., owner: {buffer: ...}, name: ..., type: ..., description: ..., location: ..., beds: ..., baths: ..., square_feet: ..., amenities: ..., rates: ..., seller_info: ..., images: ..., is_featured: ..., createdAt: ..., updatedAt: ..., __v: ...}
export function convertToSerializedObject(leanDocument: PropertiesType) {
  for (const key of Object.keys(leanDocument)) {
    const typedKey = key as keyof PropertiesType;
    if (
      typeof leanDocument[typedKey] === "object" &&
      leanDocument[typedKey] !== null &&
      "toJSON" in leanDocument[typedKey] &&
      typeof leanDocument[typedKey].toJSON === "function" &&
      typeof leanDocument[typedKey].toString === "function"
    ) {
      leanDocument[typedKey] = leanDocument[typedKey].toString();
    }
  }
  return leanDocument;
}
