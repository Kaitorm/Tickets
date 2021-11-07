class command {
    constructor() {
        this.name = "close-ticket"
        this.description = "Closes a ticket."
    }

    async execute(interaction, client) {
        const ticket = client.ticketManager.tickets.get(interaction.channel.id)
        if(!ticket) return interaction.reply({ content: "You're not in a ticket.", ephemeral: true })
        if (ticket.member.id !== interaction.user.id) {
            if (!interaction.member.permissions.has("ADMINISTRATOR")) {
                if (!interaction.member.roles.cache.has(client.config.staffRole)) return interaction.reply({ content: "You haven't the permission to close this ticket.", ephemeral: true })
            }
        }
        await ticket.delete()
    }
}

module.exports = command