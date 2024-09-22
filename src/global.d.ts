import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}
//  Powyżej znajduje się deklaracja globalnej zmiennej `mongoose`.
// Jest to obiekt, który przechowuje połączenie z bazą danych MongoDB oraz obietnicę tego połączenia.
// `conn` to aktualne połączenie z MongoDB, które może być typu `mongoose` lub `null`.
// `promise` to obietnica połączenia z MongoDB, która może być typu `Promise<typeof mongoose>` lub `null`.
// Te globalne zmienne są używane do zarządzania połączeniami z bazą danych w aplikacji, aby uniknąć wielokrotnych połączeń.
