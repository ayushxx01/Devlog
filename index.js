require('dotenv').config();
const pool = require('./db');
const {saveCommit, getTodayCommits, buildSummary, fetchDailySummary} = require('./service');
const { Client, GatewayIntentBits,   ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle } = require('discord.js');


const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", async () => {

    try {

        
        const row = new ActionRowBuilder()
        .addComponents(
        new ButtonBuilder().
        setCustomId('approve').
        setLabel("Approve").
        setStyle(ButtonStyle.Success),

        new ButtonBuilder().
        setCustomId('skip').
        setLabel("Skip").
        setStyle(ButtonStyle.Danger)
    )
          console.log(`✅ Logged in as ${client.user.tag}`);

          const channel = await client.channels.fetch(process.env.CHANNEL_ID);
           const summary = await fetchDailySummary();
        await channel.send({
            content: `📋 Today's Commits\n\n${summary}`,
            components: [row]
        });

        
          await channel.send({
            content: "Devlog online, Hare krishna",
            components: [row]
          });
    } catch (error) {
        console.error("Error sending message:", error);
    }

});
client.on('interactionCreate', async(interaction)=> {
        if(!interaction.isButton()) return;

            console.log(
        interaction.customId,
        interaction.message.id
    );
        console.log(`Button Clicked: ${interaction.customId}`);

     if(interaction.customId === 'approve') {
        const result = await getTodayCommits();
        console.log(result);
        const summary = buildSummary(result);
        console.log(summary);
        await channel.send({
        content: `📋 Today's Commits\n\n${summary}`,
        components: [row]
});
    }
else {
  
    await interaction.update({
        content: `Post skipped: ${interaction.customId}`,
        components: []
    });
}});

const express = require('express');
const app = express();
app.use(express.json());

app.post('/githook', async (req,res)=> {
 try {
        console.log("🔥🔥🔥 WEBHOOK HIT 🔥🔥🔥");
    const {repository, head_commit} = req.body;
    const repoName = repository.full_name;
    const commitHash = head_commit.id;
    const message = head_commit.message;
    const commitTime = head_commit.timestamp;

    await saveCommit(repoName, commitHash, message, commitTime);
    res.status(200).send("Commit received");
 } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Internal Server Error");
 }
});

app.post('/', (req,res)=> {
    console.log("devlog running on render");
        res.status(200).send("devlog running on render");
})

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
})

client.login(process.env.DISCORD_TOKEN);