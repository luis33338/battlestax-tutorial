#### Setup Assumptions for this tutorial:
1. You have a github account
2. (for now) You are using Mac OS

### Step One: Setup Stuff!
1. Setup an Astra account - [Astra](https://astra.datastax.com/)
2. Create a free tier database on Astra. Write down your credentials: 
```
ASTRA_DB_USERNAME=
ASTRA_DB_PASSWORD=
ASTRA_DB_KEYSPACE=
ASTRA_DB_ID=
ASTRA_DB_REGION=
GAMES_COLLECTION=games
```
3. Fork the main `BattleStax Tutorial`: https://github.com/kidrecursive/battlestax-tutorial

4. Clone _your_ `BattleStax Tutorial` repository to your local host
```
git clone git@github.com:[your_github_id]/battlestax-tutorial.git
```

Sweet! You have what you need to set up your localhost. Let's do that next.

#### A. Setup for local development:
1. Copy and paste the contents of the `.env.template` file into an `.env` file:
```
cd battlestax-tutorial
cp .env.template .env
```
2. Fill in the `.env` file variables with the Astra variables you made a copy of earlier

3. Install NodeJS 12.X LTS - [Download](https://nodejs.org/en/download/) 

4. Install Battlestax Dependencies
```
npm install
```

5. Run the provided test on the master branch:
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
3. Use all of the defaults for `Basic Build Settings`
4. Click `Advanced`, and add your environment variables. Screen shot is below.
![Netlify Setup Example](https://raw.githubusercontent.com/kidrecursive/battlestax-tutorial/step-1/tutorial/netlify_setup.png)
5. Click `Deploy Site`
6. Copy the domain name of your new site from Netlify. Screen shot is below:
![Netlify URL Example](https://raw.githubusercontent.com/kidrecursive/battlestax-tutorial/step-1/tutorial/netlify_url.png)
7. Wait for deployment!
8. When your new site is ready, you will be able to go to: `<your_url>.battlestax.app` to see your game.

#### C. Setup for Production CI/CD:
1. Add your secret variables to your github project.
![secret keys in github](https://raw.githubusercontent.com/kidrecursive/battlestax-tutorial/step-1/tutorial/github_secrets.png)
2. On your local machine, create a new branch and issue an empty commit, then push it to your fork.
```
git checkout -b test_pr
git commit -m --allow_empty "New branch to test ci/cd"
git push origin test_pr
```
3. From the Github UI, open a PR for `test_pr` into `master`. 
4. Observe the tests passing.
5. Merge the PR, observe the site deploying.
