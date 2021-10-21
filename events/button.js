class event {
    constructor() {
        this.name = "button"
    }
    async execute(button) {
        await button.deferUpdate()
        if(button.customId === "ticket") {
            const hasAlreadyCreatedTicket = button.guild.channels.cache.some((channel) => channel.topic && channel.topic.includes(button.user.id))
            if(hasAlreadyCreatedTicket === true) return button.followUp({ content: "You have already created a ticket.", ephemeral: true })
            else {
                const channel = await button.guild.channels.create(`ticket-${button.user.discriminator}`,{
                    permissionOverwrites: [{ allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],  id: button.user.id }, { deny: ["SEND_MESSAGES", "VIEW_CHANNEL"], id: button.guild.id }],
                    topic: button.user.id
                })
                await button.followUp({ content: channel.toString(), ephemeral: true })
                await channel.send({ content: `${button.member.toString()}, welcome to your ticket  !` })
            }
        }
    }
}

module.exports = event