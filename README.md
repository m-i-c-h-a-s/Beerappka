# beerappka
Praca Inżynierska - Aplikacja internetowa do tworzenia i gromadzenia receptur piwowarskich

# Backend

``cd ./backend``

__Potrzebne narzedzia__:
1. Python 3.7
2. Postgres
3. Pipenv

__Instalacja zaleznosci__

``pipenv install``

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



# Frontend

``cd ./beerappkaFrontend``

__Potrzebne narzedzia__:
1. Node.js v14.15

__Instalacja zaleznosci__

``npm install``

__Uruchomienie serwera na porcie 4200__

``npm start``

__Włączenie aplikacji w przeglądarce__

``http://localhost:4200``

# Konteneryzacja aplikacji przy uzyciu Dockera

__INFO__

Na Windowsie najlepiej korzystać Windows Subsystem for Linux (WSL).
(Na czystym Windowsie bardzo wolno działa wykrywanie zmian - livereload)

1. Uruchomić dystrybucję Ubuntu na WSL
2. Pobrać projekt z repozytorium git (jeśli go nie mamy)
3. W folderze projektu odpalić ``code .``

__Uruchamianie aplikacji__

Z glownego folderu projektu:


``docker-compose up -d`` // uruchamia obrazy

lub

``docker-compose up -d --build`` // przebudowywuje obrazy


__Zatrzymywanie aplikacji__

``docker-compose down`` // zattrzymuje aplikacje

__Wyswietlanie logow__

``docker-compose logs`` // wszystkie logi

``docker-compose logs NAZWA_USLUGI`` // wyswietla logi poszczegolnej uslugi aplikacji

__Wykonywanie komend w kontenerze__

``docker-compose exec NAZWA_USLUGI KOMENDA``

__Srodowisko DEV__

W pliku .env ustawic odpowiednie zmienne

```
DB_NAME=beerappka
DB_USER=beerappka_user
DB_PASSWORD=zaq1@WSX
DB_HOST=beerappka_db
DB_PORT=5432
```

__TODO__
- dodanie nginx
- rozdzielic konfiguracje dockera dla srodowiska dev i testing
