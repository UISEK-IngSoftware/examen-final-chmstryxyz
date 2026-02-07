/**
 * @file Character.ts
 * @description Definition of data structures for Futurama characters.
 */

export interface Character {
  id: number;
  name: string;
  gender: string;
  status: string;
  species: string;
  createdAt: string;
  image: string;
}

export interface ApiResponse {
  items: Character[];
}