/**
 * Ten obiekt zawiera stałe wartości z-index dla różnych elementów interfejsu użytkownika.
 * Z-index określa kolejność nakładania się elementów na stronie, gdzie wyższe wartości
 * oznaczają, że element będzie wyświetlany na wierzchu.
 * 
 * Użycie stałych wartości z-index pomaga w utrzymaniu spójności i przewidywalności
 * zachowania elementów nakładających się w interfejsie użytkownika.
 * 
 * MODAL_OVERLAY (30): Warstwa przyciemniająca tło podczas wyświetlania modalu.
 * MODAL (40): Sam modal, wyświetlany nad warstwą przyciemniającą.
 * TOAST (50): Powiadomienia typu toast, wyświetlane na samym wierzchu.
 * 
 * Dzięki tym stałym, możemy łatwo zarządzać kolejnością wyświetlania elementów
 * i uniknąć konfliktów z nakładającymi się komponentami w aplikacji.
 */
export const Z_INDEX = {
  PLAYER: 30,
  MODAL_OVERLAY: 40,
  MODAL: 50,
  TOAST: 60
} as const;
