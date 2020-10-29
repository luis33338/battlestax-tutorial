## BattleStax Tutorial - Step 1

### Objectives
Step 1 of the Battlestax tutorial, we will cover setting up your environment for local development, as well as setting up for production development. This includes:
* Creating an Astra account, as well as a new Astra database
* Setting up localhost for development
* Setting up for production development with Netlify
* Set up your production CI/CD pipeline

### Prerequisites:
To begin the Battlestax tutorial, you will need the following:
1. a GitHub account
2. be a Mac OS user
3. IDE of your choosing, such as VSCode

### Section A) Setup an Astra database

- **✅ Step 1. SignIn** :

To get started with a free-forever, zero-install Cassandra database **[click here](https://dtsx.io/workshop)** 🚀. 

*expected output*
![Astra](https://github.com/datastaxdevs/shared-assets/blob/master/astra/login-1000.png?raw=true)

- **✅ Step 2. You'll then be directed to the summary page. Locate the button `Add Database`**

*expected output*
![Astra](https://github.com/datastaxdevs/shared-assets/blob/master/astra/dashboard-empty-1000.png?raw=true)

- **✅ Step 3. Choose the free plan and select your region**

**Free tier**: 5GB storage, no obligation

**Region**: This is where your database will reside physically (choose one close to you or your users). For people in EMEA please use `europe-west-1`, idea here is to reduce latency.

*expected output*
![my-pic](https://github.com/datastaxdevs/shared-assets/blob/master/astra/choose-a-plan-1000-annotated.png?raw=true)

- **✅ Step 4. Configure and create your database**

Astra allows you to fill in these fields with values of your own choosing, we do recommend naming your keyspace `battlestax`

![my-pic](https://github.com/datastaxdevs/shared-assets/blob/master/astra/create-and-configure-annotated-1000.png?raw=true)

Don't forget to write down your credentials. We will turn these into environemental variables in a later step. Take note of the additional credential here that wasn't a part of our database configuration, `GAMES_COLLECTION`. We will be needing it later.

```
ASTRA_DB_USERNAME=
ASTRA_DB_PASSWORD=
ASTRA_DB_KEYSPACE=
ASTRA_DB_ID=
ASTRA_DB_REGION=
GAMES_COLLECTION=games
```

You will see your new database `pending` in the Dashboard.

*expected output*
![my-pic](https://github.com/datastaxdevs/shared-assets/blob/master/astra/dashboard-pending-1000.png?raw=true)

The status will change to `Active` when the database is ready, this will only take 2-3 minutes. You will also receive an email address when it is ready.

*expected output*
![my-pic](https://github.com/datastaxdevs/shared-assets/blob/master/astra/dashboard-withdb-1000.png?raw=true)

- **✅ Step 5. Create a new BattleStax tutorial repo in your own account**

Click on the  main `BattleStax Tutorial` into your own GitHub account: https://github.com/kidrecursive/battlestax-tutorial

![template](./tutorial/template.png?raw=true))

- **✅ Step 5. Get the Battlestax tutorial on localhost**

4. Clone _your_ `BattleStax Tutorial` repository to localhost, use the following command in your terminal to do so:
```
git clone git@github.com:[your_github_id]/battlestax-tutorial.git
```

You have what you need to set up your development environment on localhost.

#### 2. Setup for local development:
1. Copy and paste the contents of the `.env.template` file into an `.env` file:
```
cd battlestax-tutorial
cp .env.template .env
```
The `.env` file allows us to customize our own environmental variables. We set our Astra credential to env variable, which are outside of our program.

2. Fill in the `.env` file variables with the Astra variables you made a copy of earlier:
```
ASTRA_DB_USERNAME=
ASTRA_DB_PASSWORD=
ASTRA_DB_KEYSPACE=
ASTRA_DB_ID=
ASTRA_DB_REGION=
GAMES_COLLECTION=games
```


3. Check your NodeJs version in your terminal `node -v`. Make sure it is up to NodeJS 12.X LTS. If not, install NodeJS 12.X LTS - [Download](https://nodejs.org/en/download/)

4. Install Battlestax Dependencies. These are specified in the package.json file.
```
npm install
```

5. Run the provided test on the master branch. The behavior of `npm test` is also specified in the package.json file.
```
npm test
```

6. Start your app
```
npm start
```

7. Hit the loading screen
```
http://localhost:3000/
```

Done! You have successfully set up your app, run your tests locally, and started BattleStax.
Next, let's set up your production deployment process with Netlify.

#### B. Setup for Production Deployment:
1. Setup Netlify account - [Netlify](https://www.netlify.com)
2. Follow Netlify's instructions to create a `New Site from Git`. Connect it to your BattleStax fork on the master branch (connection takes a couple of steps)
3. Use all of the defaults for `Basic Build Settings` (ie. the build command and build directory)
4. Click `Advanced`, and add your environment variables. Screen shot is below.
![Netlify Setup Example](https://raw.githubusercontent.com/kidrecursive/battlestax-tutorial/step-1/tutorial/netlify_setup.png)
5. Click `Deploy Site`
6. Copy the domain name of your new site from Netlify. Screen shot is below:
![Netlify URL Example](https://raw.githubusercontent.com/kidrecursive/battlestax-tutorial/step-1/tutorial/netlify_url.png)
7. Wait for deployment!
8. When your new site is ready, you will be able to go to: `<your_url>.netlify.app` to see your game.

#### C. Setup for Production CI/CD:
1. Add your secret variables to your github project.
![secret keys in github](https://raw.githubusercontent.com/kidrecursive/battlestax-tutorial/step-1/tutorial/github_secrets.png)
2. On your local machine, create a new branch and issue an empty commit, then push it to your fork.
```
git checkout -b test_pr
git commit --allow-empty -m "New branch to test ci/cd"
git push origin test_pr
```
3. From the Github UI, open a PR for `test_pr` into `master`.
4. Observe the tests passing.
5. Merge the PR, observe the site deploying.

Great work! The next steps are on branch step-2: `git checkout step-2`
