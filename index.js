const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config();
const fs = require('fs');
const crypto = require('crypto');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers
    ]
})

client.on('ready', () => {
    // Bot startup
    console.log(`Logged in as ${client.user.username}!`);

    fs.readdirSync('./commands').forEach(command => {
        const hash = crypto.createHash('md5'); // This isnt meant to be secure, just unique

        hash.update(fs.readFileSync(`./commands/${command}`))

        const commandHash = hash.digest('hex');

        // Get all current hashes exluding lines starting with #
        const currentHashes = fs.readFileSync('./commands.hash', 'utf8').split('\n').filter(line => !line.startsWith('#'));

        if (!currentHashes.includes(commandHash)) {
            console.log(`Updating /${command.split('.')[0]}...`);

            // Add hash to commands.hash
            fs.appendFileSync('./commands.hash', `\n${commandHash}`);

            // Update command
            const name = command.split('.')[0];

            const commandData = require(`./commands/${command}`);

            const description = commandData.description;
            const options = commandData.options;

            client.application.commands.create({
                name,
                description,
                options
            })
        }
    })
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const commandData = require(`./commands/${interaction.commandName}.js`);

    try {
        commandData.execute(interaction, client);
    } catch (error) {
        interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
})

client.login(process.env.TOKEN);