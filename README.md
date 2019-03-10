## Inspiration
We spend a lot of time thinking about how to get 1,000,000 users on Ethereum.

We also think about "change the incentives, change the world".

We want to get as many new users onboarded into Ethereum as possible, so we are taking web3 to them.

Imagine a world where economic incentives push people towards good behavior online.

## What it does
Éthique is a fast onramp crypto experience crafted to spread rapidly on Twitter.

A visitor to [ethique.link](http://ethique.link) can log in on any device with their existing Twitter credentials and no extensions, and we'll give them 500 ERC20 Tweet tokens (our invention) to get started.

From that point forward, every like and retweet sends a 5 coin tip to the user who posted the Tweet. The likes and retweets get sent back to the rest of Twitter too.

Even if they're not signed up yet, anyone who receives a tip will have coins waiting for them when they arrive!

## How we built it
We're running a Skale Labs sidechain for instant finality and no hassle with gas.

We proxy the Twitter API through a set of AWS Lambda functions, and store wallets in their secure Key Management System.

## Challenges we ran into
Twitter API is a lot more irregular than expected.

## Accomplishments that we're proud of
We feel this is the simplest way yet to induct many users into Ethereum quickly!

## What we learned
There's never quite enough time for everything...

## What's next for Éthique
- Post tweets from the app!
- Post formatting and UI sugar
- Sort tweets based on how users have curated with tokens
- Construct a bridge to mainnet to allow users to top up / cash out their wallets
