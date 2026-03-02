# Angular Item Manager (Non-Standalone + XAMPP Backend)

## Project Structure

```
angular-project/
├── backend/              ← Copy to htdocs/angular-project/backend/
│   ├── db.php            ← Database connection
│   ├── items.php         ← REST API (GET, POST, PUT, DELETE)
│   └── database.sql      ← SQL to create DB and table
└── src/
    └── app/
        ├── app.module.ts           ← NgModule (non-standalone)
        ├── app-routing.module.ts   ← Routes
        ├── app.component.*         ← Root + Navbar
        ├── models/
        │   └── item.model.ts       ← Item interface
        ├── services/
        │   └── item.service.ts     ← HTTP Service (CRUD)
        └── components/
            ├── list/               ← Show all + Delete
            ├── add/                ← Add + Edit (shared)
            ├── details/            ← Show one item
            └── not-found/          ← 404 page
```

## Routes
| Path           | Component       | Description         |
|----------------|-----------------|---------------------|
| `/list`        | ListComponent   | Show all items      |
| `/add`         | AddComponent    | Add new item        |
| `/edit/:id`    | AddComponent    | Edit existing item  |
| `/details/:id` | DetailsComponent| Show item details   |
| `/**`          | NotFoundComponent| 404 page           |

## Service Methods
| Method       | HTTP    | Description         |
|--------------|---------|---------------------|
| `getAll()`   | GET     | Fetch all items     |
| `getById(id)`| GET ?id | Fetch one item      |
| `add(item)`  | POST    | Create new item     |
| `update(id)` | PUT ?id | Update item         |
| `delete(id)` | DELETE ?id | Remove item      |

---

## Setup Instructions

### 1. Backend (XAMPP)
1. Start **Apache** and **MySQL** in XAMPP Control Panel
2. Open **phpMyAdmin** → run `database.sql` to create DB + table
3. Copy the `backend/` folder to:
   ```
   C:\xampp\htdocs\angular-project\backend\
   ```
4. Test API in browser: `http://localhost/angular-project/backend/items.php`

### 2. Angular App
```bash
# Install Angular CLI (if not installed)
npm install -g @angular/cli

# Create new Angular project (non-standalone, routing enabled)
ng new angular-project --routing --no-standalone

# Copy all src/ files into your project

# Install dependencies
npm install

# Run the app
ng serve
```

### 3. Open the app
Go to: `http://localhost:4200`

---

## API Endpoints (XAMPP)
```
GET    http://localhost/angular-project/backend/items.php        → All items
GET    http://localhost/angular-project/backend/items.php?id=1   → One item
POST   http://localhost/angular-project/backend/items.php        → Create
PUT    http://localhost/angular-project/backend/items.php?id=1   → Update
DELETE http://localhost/angular-project/backend/items.php?id=1   → Delete
```
