### Step One - Setup
1. Make sure you have a Github account - [Github](https://github.com)
2. Fork of the `BattleStax Tutorial` repository - [Repository](https://github.com/kidrecursive/battlestax-tutorial)
3. Clone your battlestax fork to your machine
4. Install NodeJS 12.X LTS - [Download](https://nodejs.org/en/download/) 
5. Setup an Astra account - [Astra](https://astra.datastax.com/)
6. Create a free tier database on Astra, make sure to keep a copy of the keyspace name, the database uuid, the database region, the keyspace user, and keyspace password
7. On your local machine, create a `.env` file at the top level of your battlestax project
8. Copy and paste the contents of the `.env.template` file into your `.env` file
9. Fill in the `.env` file variables with the Astra variables you made a copy of earlier
8. Setup Netlify account - [Netlify](https://www.netlify.com)
9. Create a new site and connect it to your BattleStax fork on the master branch (connection takes a couple of steps)
10. Add your `.env` file variables as environment variables to your Netlify Site
11. Add your `.env` file variables as secrets to your Github fork
12. On your local machine, create a new branch and issue an empty commit, then push it to your fork
13. Open a PR into for your new branch, observe the tests passing
14. Merge the PR, observe the site deploying
