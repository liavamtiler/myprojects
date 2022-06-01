```
Start
step1.  set up .env base on the .env.example
Step2.  CreateDatabase
Step3.  cd Server folder and run "yarn knex migrate:latest"  &  "yarn knex seed:latest"
```
command to start: 
cd management Folder  -> yarn start to start react-app  (localhost:3000)
cd server Folder-> yarn dev to start the server engine (localhost:8080)

```
login Account: admin  password: 123456 (refer to seed file)
```

```
Remark: 
for online
REACT_APP_API=https://server.site-management.store

for local
REACT_APP_API=http://localhost:8080

```
