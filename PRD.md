# Dokumentacja Wymagań Produktowych (PRD) — MVP POS dla Anny

## 1. Wprowadzenie

Aplikacja to prosta system POS dla stacjonarnego sklepu Anny, zintegrowana z FakeStoreAPI i lokalną bazą danych.

Celem jest zapewnienie Annie wygodnego narzędzia do szybkiego wystawiania zamówień offline, z aktualnymi danymi o produktach i stanach magazynowych oraz z zachowaniem bezpieczeństwa i prostoty obsługi.

---

## 2. Buyer Persona

- Imię: Anna, 42 lata
- Właścicielka butiku z produktami lifestyle i drobną elektroniką
- Średni poziom umiejętności technicznych, potrafi korzystać z aplikacji webowych
- Ceni prostotę, szybkość i niezawodność

---

## 3. Główne zadania użytkownika

| Zadanie                        | Opis                                                                                       | Priorytet |
| ------------------------------ | ------------------------------------------------------------------------------------------ | --------- |
| Logowanie do systemu           | Logowanie przez login i hasło                                                              | Wysoki    |
| Przeglądanie listy produktów   | Wraz z kategoriami, cenami i stanami magazynowymi                                          | Wysoki    |
| Wyszukiwanie produktów         | Szybkie wyszukiwanie po nazwie i kategorii                                                 | Wysoki    |
| Tworzenie nowego zamówienia    | Wybór produktów, podanie ilości, wyliczenie sumy                                           | Wysoki    |
| Przeglądanie historii zamówień | Możliwość sprawdzenia wcześniejszych zamówień                                              | Średni    |
| Praca offline                  | Możliwość działania bez połączenia z internetem, automatyczna synchronizacja po połączeniu | Wysoki    |

---

## 4. Wymagania funkcjonalne

### 4.1 Autoryzacja

- Użytkownik loguje się za pomocą loginu i hasła
- Dostęp do API zabezpieczony tokenem JWT
- Hasła przechowywane w bazie PostgreSQL

### 4.2 Katalog produktów

- Pobieranie danych z FakeStoreAPI przez backend
- Buforowanie danych i rozszerzanie ich o informacje lokalne (stan magazynu, ceny lokalne)
- Sortowanie i filtrowanie produktów

### 4.3 Wyszukiwanie produktów

- Pole wyszukiwania po słowach kluczowych i panel ręcznego wyszukiwania wg kategorii
- Minimalna ilość klików do znalezienia produktu
- Szybka i responsywna reakcja aplikacji

### 4.4 Tworzenie zamówienia

- Wybór produktów i ich ilości
- Automatyczne obliczanie wartości zamówienia
- Zapis zamówienia w bazie PostgreSQL
- Obsługa trybu offline z lokalnym buforem i synchronizacją po przywróceniu połączenia

### 4.5 Historia zamówień

- Przeglądanie listy złożonych wcześniej zamówień
- Szczegóły zamówienia: produkty, suma, data

### 4.6 Bezpieczeństwo

- Zabezpieczenie API przez middleware i JWT
- Walidacja danych wejściowych
- Brak dostępu do endpointów bez uwierzytelnienia

---

## 5. Wymagania niefunkcjonalne

- Intuicyjny i prosty interfejs dostosowany do potrzeb użytkownika (kasjera)
- Szybkość działania i ładowania
- Stabilność i niezawodność przy niestabilnym połączeniu internetowym
- Łatwość dalszego rozwoju i utrzymania

---

## 6. Technologie

- Frontend: Next.js, React, Tailwind CSS, TanStack Query
- Backend: NestJS, PostgreSQL, Prisma ORM
- Integracja API: FakeStoreAPI (przez adapter backendowy)
- Autoryzacja: JWT z późniejszą integracją OAuth 2.0

---

## 7. Kryteria sukcesu

- Użytkownik może się poprawnie zalogować i autoryzować
- Wyświetlenie aktualnej listy produktów z możliwością wyszukiwania
- Możliwość tworzenia i zapisywania zamówień
- Aplikacja działa w trybie offline i synchronizuje dane po przywróceniu połączenia
- Brak błędów związanych z bezpieczeństwem i dostępem do danych
