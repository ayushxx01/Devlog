require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');


const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once("ready", async () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

   const channel = await client.channels.fetch('1511349091463069768');

   await channel.send("Devlog online, Hare krishna");
});

client.login(process.env.DISCORD_TOKEN);