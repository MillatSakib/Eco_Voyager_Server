# Eco Voyager (Backend)

Live Site Link: [https://eco-voyager.netlify.app/](https://eco-voyager.netlify.app/)

Client GitHub Link: [https://github.com/MillatSakib/Eco_Voyager_Client](https://github.com/MillatSakib/Eco_Voyager_Client)

## Prerequisite

- Must have install Node in your local machine for run this project.
- Must have Git for clone and push from GitHub.
- Must have Vercel if you want to deploy on vercel.

## Setup

For initializing this project you have to use the command below:

```sh
npm i
```

It will install all package and dependency need for your project. But it is not enough for run this project properly. You have to add a `.env` file in your root.
And the structure of the environment file are given below:

```env
DB_USER="*********"
DB_PASS="******"
```

If you setup this project in this way The project will run properly.

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
