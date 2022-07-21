# Beerappka

## Spis treści

* [Opis projektu](#opis-projektu)
* [Prezentacja projektu](#prezentacja-aplikacji)
* [Uruchomienie aplikacji](#uruchomienie-aplikacji)

## Opis projektu

Beerappka to mój pierwszy duży projekt, który tworzyłem w kooperacji z kolegą, w ramach pracy inżynierskiej. Ja zająłem się implementacją części frontendowej (z wykorzystaniem frameworka Angular oraz Bootstrap'a), natomiast część backendową (z wykorzystaniem Pythonowego frameworka Django) zaimplementował mój kolega Emil.

Jest to aplikacja internetowa do tworzenia i gromadzenia receptur piwowarskich. Aplikacja jest przeznaczona dla piwowarów domowych, którzy układają własne przepisy na domowe piwo.

Beerappka ma na celu usprawnienie procesu tworzenia receptur, a także ułatwić ich zapisywanie i gromadzenie. Użytkownicy mogą tworzyć zarówno prywatne jak i publiczne przepisy. Przepisy publiczne są ogólnodostępne w katalogu receptur, więc użytkownicy mogą inspirować się pomysłami innych.

Aplikacja posiada możliwość tworzenia i publikowania artykułów traktujących o tematyce piwowarstwa, zatem użytkownicy mogą dzielić się swoją wiedzą i przemyśleniami. Wprowadza to swojego rodzaju aspekt społecznościowo-edukacyjny.

Kolejną funkcjonalnością jest możliwość zapisywania dokumentacji z procesu powstawania piwa (w aplikacji tzw. warki). Użytkownik może dla wybranej receptury, którą uwarzył, zapisywać informacje o etapach zacierania, a także pomiary BLG na różnych etapach. Dzięki temu może analizować jak przebieg zacierania oraz fermentacji wpłynął na finalny efekt (gotowe piwo).

Aplikacja posiada też kilka przydatnych kalkulatorów, które pozwalają obliczać istotne dla procesu powstawania piwa parametry. Kalkulatory umożliwiają przeliczenie wartości gęstości piwa/brzeczki pomiędzy skalą BLG oraz Specific Gravity, obliczenie ilości cukru potrzebnego do nagazowania piwa na zadanym poziomie, wyliczenia spodziewanego poziomu alkoholu w gotowym piwie, a także obliczenie ilości surowca potrzebnego do skorygowania gęstości.

## Prezentacja aplikacji

<h3>
  <p align="center">Landing page</p>
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/81260270/180215071-92a01e00-1787-4e28-81b4-80a1416c65c3.png" align="middle" height="67%" width="67%">
</p>

<h3>
  <p align="center">Dashboard użytkownika</p>
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/81260270/180214747-339ff1e2-0be5-42b4-b35d-c6912befb6b0.png" align="middle" height="67%" width="67%">
</p>

<h3>
  <p align="center">Lista receptur</p>
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/81260270/180215387-1b92f61c-423b-49f8-a981-ae8b8ad7ed99.png" align="middle" height="67%" width="67%">
</p>

<h3>
  <p align="center">Podgląd receptury</p>
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/81260270/180217023-c6e9f5fe-824f-47f5-98d6-0cbcf0a36c29.png" align="middle" height="67%" width="67%">
</p>


<h3>
  <p align="center">Tworzenie receptury</p>
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/81260270/180216853-50d415fe-d7e6-470d-a5dd-ce8c7e1d551b.png" align="middle" height="67%" width="67%">
</p>

<h3>
  <p align="center">Artykuły</p>
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/81260270/180216279-e848b00c-7ab5-4b3a-a06f-908dda30ca15.png" align="middle" height="67%" width="67%">
</p>
<p align="center">
  <img src="https://user-images.githubusercontent.com/81260270/180216304-9309bced-5886-4a94-8a55-e805693f1ed2.png" align="middle" height="67%" width="67%">
</p>

<h3>
  <p align="center">Kalkulator ilości cukru do nagazowania</p>
</h3>
<p align="center">
  <img src="https://user-images.githubusercontent.com/81260270/180217152-3392e578-5916-4f5f-b226-989a939a0eca.png" align="middle" height="67%" width="67%">
</p>

## Uruchomienie aplikacji

### Backend

``cd ./backend``

__Potrzebne narzedzia__:
1. Python 3.7
2. Postgres

Pipenv zastąpiony został plikiem requirements.txt

Jeśli nie korzysta się z dockera,
to najpierw trzeba stworzyć venv

`cd backend`
`python -m venv .venv`

Następnie trzeba aktywować venv w z folderu backend
`.\venv\Scripts\activate` (Windows)


__Instalacja zaleznosci__

W aktywnym venv odpalic

`pip install -r requirements.txt`

__Konfiguracja ustawien__
1. Stworzyc bazę danych Postgres
2. Stworzyc plik `.env` z odpowiednimi ustawieniami na podstawie `.env.example`

__Odpalenie migracji__
- ``python manage.py makemigrations`` (generuje zmiany modelu, tworzy plik migracji)
- ``python manage.py migrate`` (odpala migracje na bazie danych)

__Stworzenie usera admina__

``python manage.py createsuperuser``

__Uruchomienie serwera Django na porcie 8000__

``python manage.py runserver``

__Wejscie w panel admina w przeglądarce__

``http://localhost:8000/admin/``

__Wejscie w dokumentacje API w przegladarce__

``http://localhost:8000/api/v1/docs/``



### Frontend

``cd ./beerappkaFrontend``

__Potrzebne narzedzia__:
1. Node.js v14.15

__Instalacja zaleznosci__

``npm install``

__Uruchomienie serwera na porcie 4200__

``npm start``

__Włączenie aplikacji w przeglądarce__

``http://localhost:4200``

### Konteneryzacja aplikacji przy uzyciu Dockera

__INFO__

Na Windowsie najlepiej korzystać z Windows Subsystem for Linux (WSL).
(Na czystym Windowsie bardzo wolno działa wykrywanie zmian - livereload)

Aby zainstalowaś WSL na Windowsie, należy uruchomić wiersz poleceń
z uprawnieniami administratora, a następnie wydać komendę:

``wsl install``


1. Uruchomić dystrybucję Ubuntu na WSL
2. Pobrać projekt z repozytorium git (jeśli go nie mamy)
3. W folderze projektu odpalić ``code .``


__Srodowisko DEV__

W folderze backend stworzyć plik .env i ustawić odpowiednie zmienne:

```
DB_NAME=beerappka
DB_USER=beerappka_user
DB_PASSWORD=zaq1@WSX
DB_HOST=beerappka_db
DB_PORT=5432

FRONTEND_URL=http://localhost:4200
FRONTEND_RESET_PASSWORD_CONFIRM_URL=/resetuj-haslo-potwierdz/
REDIRECT_CONFIRM_EMAIL=/logowanie
DEBUG=1
```


__Uruchamianie aplikacji__

Z glownego folderu projektu:


``docker-compose up -d`` // uruchamia obrazy

lub

``docker-compose up -d --build`` // przebudowywuje obrazy


__Zatrzymywanie aplikacji__

``docker-compose down`` // zatrzymuje aplikacje

__Wyswietlanie logow__

``docker-compose logs`` // wszystkie logi

``docker-compose logs NAZWA_USLUGI`` // wyswietla logi poszczegolnej uslugi aplikacji

__Wykonywanie komend w kontenerze__

``docker-compose exec NAZWA_USLUGI KOMENDA``

__Stworzenie usera admina w aplikacji skonteneryzowanej__

Po uruchomieniu kontenerów z usługami, do aplikacji można zarejestrować się jako zwykły użytkownik.

``localhost:4200/``

Aby uzyskać dostęp do panelu administracyjnego, należy stworzyć konto user admina.

``docker-compose exec beerappka_backend python manage.py createsuperuser``

Po stworzeniu konta administratora, zalogowanie jest możliwe pod adresem

``localhost:8000/admin``

Przykładowe dane należy wczytać z pliku data.json. Zawiera on przykładowe surowce, ich producentów oraz style piwne.
W celu wczytania plików należy uruchomić komendę:

``docker-compose exec beerappka_backend python manage.py loaddata data.json``


