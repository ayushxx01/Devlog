// test-x.js

require('dotenv').config();

const { TwitterApi } = require('twitter-api-v2');
console.log(process.env.X_API_KEY);
console.log(process.env.X_API_SECRET);
console.log(process.env.X_ACCESS_TOKEN);
console.log(process.env.X_ACCESS_TOKEN_SECRET);
const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
});

async function testPost() {
  try {
    const response = await client.v2.tweet(
      'Testing DevLog integration 🚀'
    );

    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

testPost();