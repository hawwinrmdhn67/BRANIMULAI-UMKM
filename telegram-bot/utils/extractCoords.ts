import { Coordinates } from "./../types/botTypes";

export function extractCoordinates(url: string): Coordinates | null {
  const regex1 = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const regex2 = /q=(-?\d+\.\d+),(-?\d+\.\d+)/;
  const match = url.match(regex1) || url.match(regex2);
  if (match) return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
  return null;
}
