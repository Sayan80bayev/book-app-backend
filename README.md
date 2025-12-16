**Project Overview**

Описание: Небольшой backend на TypeScript с GraphQL (Apollo Server), MongoDB (Mongoose) и WebSocket-уведомлениями.

Цели: предоставить API для управления книгами, категориями, отзывами и пользователями, а также поддержать realtime-уведомления о событиях (через WebSocket).

Домен: книги (Book), категории (Category), отзывы (Review), пользователи (User).

Роли пользователей:
- **User:** может регистрироваться, логиниться, создавать/редактировать свои книги/отзывы в соответствии с правами.


**Data Schema (кратко)**
- **User**: `id`, `username` (unique), `password`, `bio`, `birthDate`, `nationality`, `isDeleted`.
- **Book**: `id`, `title`, `author`, `categories[]` (refs), `description`, `createdBy` (user id).
- **Category**: `id`, `name`, `description`, `icon`.
- **Review**: `id`, `bookId` (ref), `userId` (ref), `rating`, `comment`.

Связи:
- Book — многие ко многим с Category (через массив `categories`).
- Review — принадлежит Book и User.

Модели в коде:
- [src/infra/db/mongoose/UserModel.ts](src/infra/db/mongoose/UserModel.ts)
- [src/infra/db/mongoose/BookModel.ts](src/infra/db/mongoose/BookModel.ts)
- [src/infra/db/mongoose/CategoryModel.ts](src/infra/db/mongoose/CategoryModel.ts)
- [src/infra/db/mongoose/ReviewModel.ts](src/infra/db/mongoose/ReviewModel.ts)

**Как запустить локально (2 шага с Docker)**
- **1) Поднять MongoDB через docker-compose:**
```bash
docker compose up -d mongo
```
- **2) Запустить приложение (локально):**
```bash
cp .env.example .env
npm install
npm run dev
```

Альтернатива — запустить приложение в контейнере (сборка образа):
```bash
docker build -t book-app .
docker run --env-file .env -p 4000:4000 --name book-app -d book-app
```

Файлы конфигурации:
- [docker-compose.yaml](docker-compose.yaml) — поднимает сервис `mongo`.
- [.env.example](.env.example) — пример переменных окружения.

**Как проверить realtime (пошагово)**
1. Поднимите `mongo` и приложение (см. выше).
2. Залогиньтесь (через GraphQL `loginUser`) и получите `token`.
3. Откройте WebSocket-клиент (например, `wscat` или браузерный клиент). Подключайтесь к серверу WebSocket на порту из `.env` (по умолчанию `WS_PORT=4001`) с параметром `userId`:
```bash
wscat -c "ws://localhost:4001/?userId=<YOUR_USER_ID>"
```
4. Выполните действие, которое генерирует событие (например, создать отзыв): GraphQL-мутация `createReview`.
5. Сервер пришлёт JSON-сообщение вида:
```json
{ "event": "reviewCreated", "payload": { ... } }
```

Реализация WebSocket в коде: [src/infra/events/WebSocketEventBus.ts](src/infra/events/WebSocketEventBus.ts). Клиенты регистрируются по `userId` в query string; события отправляются пользователю, указанному в `payload.userId`.


Чтобы создать тестового пользователя, используйте GraphQL `registerUser` 

**Скрипты**
- **dev**: `npm run dev` — запуск в режиме разработки (см. `package.json`).
- **build**: `npm run build` — билд TypeScript (создаёт `dist/`).
- **start**: `npm start` — запуск прод-версии (`node dist/index.js`).
**Полезные файлы**
- Основная точка входа: [src/index.ts](src/index.ts)
- Конфиг окружения: [src/config.ts](src/config.ts)
- GraphQL schema/resolvers: [src/app/graphql/schema.ts](src/app/graphql/schema.ts)

