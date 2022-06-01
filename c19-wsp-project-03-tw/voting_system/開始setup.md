# WSP006 Review (2022.02.15)

## Preparation

## 1. `npm`

```bash
npm init -y

npm install ts-node typescript @types/node
```

## 2. Create files

### `.gitignore`
```
node_modules
.DS_Store
```

### `.prettierrc`
```json
{
  "tabWidth": 2,
  "printWidth": 100
}
```

### `tsconfig.json`
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

### `index.js`
```javascript
require('ts-node/register');
require('./app');
```

### `app.ts`
```typescript
console.log('hello, world!');
```

### Try Run

```
node .
```

## 3. `memo-wall` Folder Structure

```
memo-wall
├── node_modules
├── public
│   ├── css
│   │   └── index.css
│   │
│   ├── images
│   │   └── wallpaper.jpg
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

### ASCII Code

https://en.wikipedia.org/wiki/Box-drawing_character#Unicode


## 4. `Express.js` (Part 1)

```bash
npm i express @types/express
```

### `app.ts`

```typescript
import express from "express";

const app = express();

app.get('/', (req, res) => {
  res.end('Hello World');
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`[info] listening to port ${PORT}`);
});
```

## 4. Configure for Development

```bash
npm i ts-node-dev
```

### `package.json`

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

```bash
npm run dev
```

## 6. `Express.js` (Part 2)

```typescript

app.use(express.static('public'));

app.use((req, res) => {
  res.sendFile(path.resolve('./public/404.html'));
});
```

## 7. `express-session`

```bash
npm install express-session @types/express-session
```

```typescript
import expressSession from 'express-session';
const app = express();

// Add this line
app.use(expressSession({
    secret: 'Tecky Academy teaches typescript',
    resave: true,
    saveUninitialized: true
}));
```

## 8. `index.html`

https://getbootstrap.com/docs/5.1/getting-started/introduction/

```html
```

```html
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3">
                <div id="panel">
                </div>
            </div>
            <div class="col-lg-9">
                <div class="memo-container">
                </div>
            </div>
        </div>
    </div>
</body>
```

## 9. `JSONFILE`

```
npm i npm install jsonfile @types/jsonfile
```

## 10. `pg` 

用黎連database

```
npm install pg @types/pg 

```

## 11. `dotenv` 
用黎hidden 密碼
```
dotenv @types/dotenv

```

##12 `knex`

yarn add knex @types/knex pg @types/pg
yarn knex init -x ts