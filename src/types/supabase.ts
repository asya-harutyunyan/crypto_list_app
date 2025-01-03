import { Tables, TablesInsert, TablesUpdate } from "../../database.types";

export type CryptoItem = Tables<"crypto-item">;
export type CryptoItemInsert = TablesInsert<"crypto-item">;
export type CryptoItemUpdate = TablesUpdate<"crypto-item">;
