# Redcord
Redcord is a simple reddit intergration for discord.

## Features
* Lookup posts from a subreddit

## Commands
### Subreddit
Arguments: `subreddit`, `limit` (optional)
* `/subreddit new` - See the newest posts from a subreddit
* `/subreddit hot` - See the hottest posts from a subreddit
* `/subreddit top` - See the top posts from a subreddit | Arguments: `time` (optional)
* `/subreddit rising` - See the rising posts from a subreddit

## Hosting
### Requirements
* Node.js 16.6.0 or newer
* A discord bot token
* NPM

### Installation
1. Clone the repository or download the zip [here](https://github.com/NotPiny/Redcord/archive/refs/heads/main.zip)

2. Install the dependencies with npm
```bash
npm install
```

3. Rename the `.env.example` file to `.env` and fill in the required information

4. Start the bot
```bash
npm start # or node .
```