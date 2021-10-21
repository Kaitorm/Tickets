class event {
    constructor() {
        this.name = "command"
    }
    async execute(interaction, client) {
        if(!client.commands.has(interaction.commandName)) return
        try {
            client.commands.get(interaction.commandName).execute(interaction, client)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = event