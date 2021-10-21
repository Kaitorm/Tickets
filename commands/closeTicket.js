class command {
    constructor() {
        this.name = "close-ticket"
        this.description = "Closes a ticket."
    }

    async execute(interaction, client) {
        if(!interaction.channel.name.startsWith("ticket-")) return interaction.reply({ content: "You're not in a ticket.", ephemeral: true })
        if(interaction.channel.topic !== interaction.user.id || !interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: "You haven't the permission to close this ticket.", ephemeral: true })
        interaction.channel.delete()
    }
}

module.exports = command