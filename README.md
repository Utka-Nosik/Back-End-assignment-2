# Pet Shop API Project 🐾

This is a backend project for a Pet Shop application using Node.js and Express. It allows users to view, add, update, and delete items from the shop inventory stored in a JSON file.

## Project Structure
- `server.js`: The main server entry point.
- `data.json`: A JSON file acting as a database for items.
- `package.json`: List of dependencies (Express, etc.).
- `public/`: Folder for static files (HTML, CSS, JS).

## How to Install Dependencies
1. Clone the repository or download the files.
2. Open the terminal in the project directory.
3. Run the following command to install Express and other modules:

```bash
npm install
```

## How to Run the Server

```bash
node .\first_serv.js
```

The server will start running at: http://localhost:3000

## List of API Routes

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/items` | Get list of all items |
| **POST** | `/items` | Create a new item |
| **PUT** | `/items/:id` | Update an existing item by ID |
| **DELETE** | `/items/:id` | Delete an item by ID |
| **GET** | `/time` | Get current server time |
| **GET** | `/status` | Check server status (200 OK) |

## Example Requests (for Postman / Thunder Client)

### 1. Create a New Item (POST)
**URL:** `http://localhost:3000/items`

**Body (JSON):**
```json
{
  "name": "Premium Cat Food",
  "price": 25,
  "category": "Food",
  "description": "Healthy food for adult cats"
}
```

### 2. Update an Item (PUT)
**URL:** `http://localhost:3000/items/1`

**Body (JSON):**
```json
{
  "price": 30,
  "description": "Updated price for holiday sale"
}
```

### 3. Delete an Item (DELETE)
**URL:** `http://localhost:3000/items/1`