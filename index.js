require('dotenv').config();
// const db = require('./db');
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
        // db.run(`INSERT INTO commits (repo, message) VALUES (?,?)`, ["devlogBot", "ch ch ch"],
        //     function(err) {
        //         if(err){
        //             console.log("error submitting post", err);
        //             return;
                    
        //         }
        //         console.log("posted", this.lastID);
        //     }
        // );
        await interaction.update({
    content: `Post approved: ${interaction.customId}`,
    components: []
}  
    );
    }
else {
    // db.all(`SELECT * FROM commits`, [], (err,rows)=> {
    //     console.log(rows);
    // })
    await interaction.update({
        content: `Post skipped: ${interaction.customId}`,
        components: []
    });
}});

const express = require('express');
const app = express();
app.use(express.json());

app.post('/githook', (req,res)=> {
    console.log("🔥🔥🔥 WEBHOOK HIT 🔥🔥🔥");
    res.status(200).send('Webhook received');
});


app.post('/', (req,res)=> {
    console.log("devlog running on render");
        res.status(200).send("devlog running on render");
})


app.listen(process.env.PORT, ()=> {
    console.log(`Server is running on port ${process.env.PORT}`);
})

client.login(process.env.DISCORD_TOKEN);