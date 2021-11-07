class event {
    constructor() {
        this.name = "button"
    }
    async execute(button, client) {
        await button.deferUpdate()
        if(button.customId === "ticket") {
            if (client.ticketManager.checkDoubleTickets(button.guild.id, button.member.id))return button.followUp({ content: "You have already created a ticket.", ephemeral: true })
            else {
                const ticket = await client.ticketManager.createTicket(button.guild, button.member);
                await button.followUp({ content: ticket.channel.toString(), ephemeral: true })
                await ticket.channel.send({ content: `${button.member.toString()}, welcome to your ticket  !` })
            }
        }
    }
}

module.exports = event