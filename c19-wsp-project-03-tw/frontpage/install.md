# WSP Revision Group S (2022.02.23)

# Part 1 - Project Initialization

## `npm`
```bash
npm init -y

npm install ts-node typescript @types/node
```

## `tsconfig.json`
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "allowJs": true,
        "jsx": "react",
        "esModuleInterop":true,
        "moduleResolution": "node",
        "noImplicitReturns": true,
        "noImplicitThis": true,
        "noImplicitAny": true,
        "strictNullChecks": true,
        "suppressImplicitAnyIndexErrors": true,
        "noUnusedLocals": true
    },
    "exclude": [
        "node_modules",
        "build",
        "scripts",
        "index.js"
    ]
}
```

## `.gitignore`
```bash
node_modules
.DS_Store
.env
```

## `.prettierrc`
```json
{
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": false,
    "singleQuote": true,
    "overrides": [
        {
            "files": ["*.ts", "*.js"],
            "options": {
                "semi": true,
                "tabWidth": 2,
                "singleQuote": false,
                "printWidth": 100
            }
        }
    ]
}
```

## `index.js`
```javascript
require('ts-node/register');
require('./app');
```

## `app.ts`
```typescript
console.log('hello, world!');
```

## Try Run
```bash
node .
```

# Part 2 - Backend : Express.js

## `npm`
```bash
npm i express @types/express

npm i ts-node-dev
```

## Project Folder Structure

```
project
├── node_modules
├── public
│   ├── css
│   │   └── index.css
│   │
│   ├── images
│   │   └── image.jpg
│   │
│   ├── js
│   │   └── index.js
│   │
│   ├── 404.html
│   └── index.html
│   
├─ .gitignore
├─ .prettierrc
├─ app.ts
├─ index.js
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```

## `package.json`
```json
{
  //...
  "scripts": {
    "start": "node index.js",
    "dev": "ts-node-dev app.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  //...
}
```

## `app.ts`
```typescript
import express from 'express';
import { Request, Response } from 'express';

const app = express();

app.get('/', function (req: Request, res: Response) {
    res.end("Hello World");
})

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/`);
});
```

## Try Run

```bash
# For Production
npm run start

# For development
npm run dev
```

Goto: http://localhost:8080


# Part 3 - PostgreSQL

## `psql` environment

For Windows:
```powershell
# For PostgreSQL vesrion 14

[Environment]::SetEnvironmentVariable("PATH", $Env:PATH + ";C:\Program Files\PostgresSQL\14\bin", [EnvironmentVariableTarget]::Machine)

# For PostgreSQL vesrion 13

[Environment]::SetEnvironmentVariable("PATH", $Env:PATH + ";C:\Program Files\PostgresSQL\13\bin", [EnvironmentVariableTarget]::Machine)
```

For Mac:
```bash
# For PostgreSQL version 14

sudo mkdir -p /etc/paths.d && echo /Library/PostgreSQL/14/bin/ | sudo tee /etc/paths.d/postgresapp

# For PostgreSQL version 13

sudo mkdir -p /etc/paths.d && echo /Library/PostgreSQL/13/bin/ | sudo tee /etc/paths.d/postgresapp
```

### `npm`
```bash
npm install pg @types/pg dotenv @types/dotenv
```

### `.env` & `.env.sample`
```
DB_NAME=wsp-revision
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

### SQL Shell `psql` & `database.sql`
```sql
create database "wsp-revision";
```

### ERD Editor & `database.vuerd.json`

#### Visual Studio Code Extension
https://marketplace.visualstudio.com/items?itemName=dineug.vuerd-vscode

#### ERD Sample
https://drawsql.app/templates/koel

```sql
CREATE TABLE users
(
  id             SERIAL   PRIMARY KEY,
  name           VARCHAR  NOT NULL,
  email          VARCHAR  NOT NULL,
  password       VARCHAR  NOT NULL,
  is_admin       BOOLEAN  NOT NULL,
  preferences    TEXT     NULL    ,
  remember_token VARCHAR  NULL    ,
  created_at     TIMESTAMP NOT NULL,
  updated_at     TIMESTAMP NOT NULL
);

CREATE TABLE playlists
(
  id         SERIAL   PRIMARY KEY,
  user_id    int      NOT NULL,
  name       VARCHAR  NOT NULL,
  rules      TEXT     NULL    ,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);

ALTER TABLE playlists
  ADD CONSTRAINT FK_users_TO_playlists
    FOREIGN KEY (user_id)
    REFERENCES users (id);

INSERT INTO users 
(name,email,password,is_admin,preferences,remember_token,created_at,updated_at) 
VALUES ('Leo','leo@tecky.io','leo@tecky.io',true,'','',NOW(),NOW());

select * from users;
```

## `app.ts`
```typescript
import {Client} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

client.connect();
```

## `Insomnia`
```
GET http://localhost:8080
```

# Part 4 - Backend : `express-session`, `bcryptjs` & `routers`

## `npm`
```
npm install express-session @types/express-session

npm i bcryptjs @types/bcryptjs
```

## `hash.ts`
```typescript
import * as bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

export async function hashPassword(plainPassword: string) {
  const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  return hash;
}

export async function checkPassword(plainPassword: string, hashPassword: string) {
  const match = await bcrypt.compare(plainPassword, hashPassword);
  return match;
}
```
## `guards.ts`
```typescript
import { Request, Response, NextFunction } from "express";

export const isLoggedInStatic = (req: Request, res: Response, next: NextFunction) => {
  if (req.session["user"]) {
    next();
    return;
  }

  console.log("[INFO] user is not logged in");
  res.redirect("/");
};

export const isLoggedInApi = (req: Request, res: Response, next: NextFunction) => {
  if (req.session["user"]) {
    next();
    return;
  }

  console.log("[INFO] user is not logged in");
  res.status(401).json({ message: "Unauthorized" });
};
```

## `models.ts`
```typescript
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  is_admin: boolean;
  preferences: string;
  remember_token: string;
  created_at: Date;
  updated_at: Date;
}
```

## `routers/userRoutes.ts`
```typescript
import express from "express";
import { client } from "../app";
import { isLoggedInApi } from "../guards";
import { checkPassword } from "../hash";
import { User } from "../models";

export const userRoutes = express.Router();

// LOGIN
// Method: POST,,,, Path: /login
userRoutes.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const foundUser: User | undefined = (
        await client.query(/*sql*/ `SELECT *, email as username FROM users WHERE email = $1`, [username])
    ).rows[0];

    if (!foundUser || !(await checkPassword(password, foundUser.password))) {
        res.status(401).json({ message: "Incorrect Username or Password" });
        return;
    }

    req.session["user"] = { id: foundUser.id, username: foundUser.username };
    res.json({ message: "success" });
    return;
});

userRoutes.get("/userInfo", isLoggedInApi, async (req, res) => {
    const user = req.session["user"];
    res.json(user);
});
```

## `app.ts`
```typescript
import path from 'path';
import expressSession from "express-session";
import { isLoggedInStatic } from "./guards";
```

```typescript
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    expressSession({
        secret: "Tecky Academy teaches typescript",
        resave: true,
        saveUninitialized: true,
    })
);
```

```typescript
import { userRoutes } from "./routers/userRoutes";
app.use(userRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(isLoggedInStatic, express.static("protected"));

app.use((req, res) => {
    res.sendFile(path.resolve("./public/404.html"));
});
```

# Part 5 - Frontend : `login.html`, `login.js`

`login.html`
```html
<body>
<!--...-->
            <form id="form-login">
                <input type="text" id="username" name="username" class="fadeIn second" placeholder="login">
                <input type="password" id="password" name="password" class="fadeIn third" placeholder="password">
                <input type="submit" class="fadeIn fourth" value="Log In">
            </form>
<!--...-->
</body>
```

`login.js`
```javascript
window.onload = () => {
  initLoginForm();
}

function initLoginForm() {
  const loginForm = document.getElementById("form-login");
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formObject = {
      username: loginForm.username.value,
      password: loginForm.password.value,
    };

    const resp = await fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formObject),
    });

    if (resp.status === 200) {
      window.location.href = "/admin.html";
    }
  });
}
```






