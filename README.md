# Eco Voyager

### Deployment:

For first time deployment into vercel you have to follow the command bellow:

Step 1:

```sh
vercel login
```

Step 2:

```sh
vercel
```

Then fillup the requirement and press enter.

If you execute that command the in previous then you can execute the command bellow:

```sh
vercel --prod
```

Note: The vercel.json file must be inclueded and must remove the expression `await client.connect();` The vercel.json are given bellow:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "./index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}
```
