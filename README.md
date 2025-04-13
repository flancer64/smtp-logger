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

### Example: SQLite (better-sqlite3)

```bash
DB_CLIENT=better-sqlite3
DB_FILE=./var/data.sqlite3
```

### Example: Network databases (PostgreSQL, MySQL, etc.)

```bash
DB_CLIENT=pg            # or mysql, etc.
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mydb
DB_USER=user
DB_PASS=password
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
logger: "|/usr/local/bin/smtp-logger/index.js"
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

## See the output

Use this script (`/tmp/log.sh`) to redirect output to a file:

```shell
#!/bin/sh
cd /path/to/smtp-logger/
./index.js >> /tmp/smtp-logger.log 2>&1
```

Edit `/etc/aliases`:

```bash
logger: "|/tmp/log.sh"
```

Then update aliases:

```bash
sudo newaliases
```

---

## License

Apache License 2.0

---

© Alex Gusev & LLMs, 2025