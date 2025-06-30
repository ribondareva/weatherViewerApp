# 🌦️ Weather Viewer App

Приложение на React для просмотра прогноза погоды в любом городе мира. Пользователь выбирает город кликом по карте Yandex Maps, и получает текущую погоду, а также прогноз на ближайшие 5 дней. Данные берутся из [OpenWeather API](https://openweathermap.org/api).

## 🚀 Демонстрация

![Weather Viewer Screenshot](./screenshot.png) <!-- Добавьте скриншот, если хотите -->

## 🔧 Используемые технологии

- **React** 19+
- **Axios** — для HTTP-запросов
- **OpenWeather API** — получение погоды
- **Yandex Maps API** — выбор города по клику на карту
- **Webpack** — сборка проекта
- **dotenv** — для безопасного хранения ключей API

## 📦 Установка и запуск

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/ribondareva/weatherViewerApp.git
cd weatherViewerApp``


### 2. Установите зависимости

```bash
npm install
```

### 3. Создайте .env файл
```bash
touch .env
```
И добавьте туда:
```
REACT_APP_WEATHER_API_KEY=ваш_ключ_OpenWeather
REACT_APP_YANDEX_API_KEY=ваш_ключ_Yandex_Maps
```
Получить API-ключи можно здесь:
* [OpenWeather API](https://home.openweathermap.org/api_keys)
* [Yandex Maps API](https://developer.tech.yandex.ru/)

### 4. Запустите приложение
```bash
npm start
```
Откроется в браузере по адресу: http://localhost:8080

## Возможности
- Отображение текущей температуры и описания погоды
- Прогноз погоды на 5 дней
- Выбор города по клику на интерактивной карте
- Геокодирование координат в название города через Yandex API
