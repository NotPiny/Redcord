module.exports = {
    name: 'ping',
    description: 'Ping!',

    execute: async(interaction, client) => {
        interaction.reply({ content: 'Pong!', ephemeral: true });
    }
}