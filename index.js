
require('dotenv').config();
const { Client, GatewayIntentBits,   ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle } = require('discord.js');


const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.once("clientReady", async () => {

    try {
        const db = require('./db');
        db.run(`CREATE TABLE IF NOT EXISTS commits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            repo TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
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
        await interaction.update({
    content: `Post approved: ${interaction.customId}`,
    components: []
}  
    );
    }
else {
    await interaction.update({
        content: `Post skipped: ${interaction.customId}`,
        components: []
    });
}});

client.login(process.env.DISCORD_TOKEN);