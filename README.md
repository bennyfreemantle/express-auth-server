# Simple express authentication server

Generate JWT_SECRET

```
node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"
```

Update `.env.example` file

```
DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<databse_name>"
PORT=3000
JWT_SECRET="secret_generated_from_above_step"
JWT_EXPIRATION_TIME="1h"
```
