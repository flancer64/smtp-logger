# @flancer64/smtp-logger

📨 A lightweight Node.js utility for logging received emails to a database.  
Designed to be used as a `pipe`-based handler in `Postfix` (e.g. via `always_bcc`),  
it parses and stores full email messages in a SQL database using [`knex`](https://knexjs.org/).  
Dependency injection is powered by [`@teqfw/di`](https://www.npmjs.com/package/@teqfw/di).

---

## Features

- Works as a `stdin`-based mail handler (e.g. from Postfix aliases)
- Parses full MIME email (headers + plain text or HTML body)
- Logs to PostgreSQL, SQLite, MySQL, or any other Knex-supported DB
- Modular architecture with dependency injection
- Supports both SQLite file-based and network database connections
- Automatic database schema initialization

---

## Use Cases

- Audit/logging of all outgoing emails in multi-app environments
- Integrates into Postfix using `always_bcc` or direct aliases
- Useful in production and staging for tracking system-generated messages

---

## Requirements

- Node.js 18+
- `knex` (tested with PostgreSQL, SQLite, and MySQL)
- `@teqfw/di`
- `mailparser`
- `minimist`
- `dotenv`

---

## Installation

```bash
git clone https://github.com/yourname/smtp-logger.git
cd smtp-logger
npm install
```

---

## Configuration

Configure using either environment variables or command-line arguments:

### Environment Variables

```bash
DB_CLIENT=better-sqlite3  # or pg, mysql, etc.
DB_FILE=./var/data.sqlite3
DB_HOST=localhost         # for network databases
DB_NAME=mydb
DB_USER=user
DB_PASS=password
DB_PORT=5432
```

### Command Line Arguments

```bash
node index.js log --dbClient=better-sqlite3 --dbFile=./var/data.sqlite3
```

---

## Usage

### Initialize Database

```bash
node index.js init-db
```

### Log an Email

Pipe an email to the utility:

```bash
cat sample.eml | node index.js
```

Or test manually:

```bash
cat sample.eml | node index.js log
```

---

## Postfix Integration

### Step 1: Add alias

Edit `/etc/aliases`:

```bash
logger: "|/usr/local/bin/smtp-logger.js"
```

Then update aliases:

```bash
sudo newaliases
```

### Step 2: Configure always_bcc

In `/etc/postfix/main.cf`:

```ini
always_bcc = logger@localhost
```

---

## Database Schema

The utility automatically creates this schema when initialized:

```sql
CREATE TABLE message
(
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    ts        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    sender    TEXT,
    recipient TEXT,
    subject   TEXT,
    origin    TEXT
);
```

> Note: Uses `AUTOINCREMENT` for SQLite or `SERIAL` for PostgreSQL.

---

## License

Apache License 2.0

---

© Alex Gusev & LLMs, 2025