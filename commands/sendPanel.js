class command {
    constructor() {
        this.name = "send-panel"
        this.description = "Sends the panel to the channel you want."
        this.options = [{
            type: 7,
            name: "channel",
            description: "The channel where you want to send the panel.",
            required: true
        }]
    }

    async execute(interaction, client) {
        const channel = interaction.options._hoistedOptions[0].channel
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You're not administrator.", ephemeral: true })
        if(channel.type !== "GUILD_TEXT") return interaction.reply({ content: "The channel must be a text channel.", ephemeral: true })
        await channel.send({
            embeds: [{
                title: "Tickets!",
                description: "Click on the button below to open a ticket.",
                footer: { text: "Made by Kaito. ❤️" },
                color: client.config.color
            }],
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 1,
                    emoji: "📧",
                    custom_id: "ticket"
                }]
            }]
        })
        await interaction.reply({ content: "Done!", ephemeral: true })
    }
}

module.exports = command