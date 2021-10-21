class event {
    constructor() {
        this.name = "ready"
    }

    execute(client) {
        const commands = []
        client.commands.map(({ execute, ...data }) => commands.push(data))
        client.application.commands.set(commands).then(() => {})
        console.log(`Username : ${client.user.tag}`)
        console.log(`Servers : ${client.guilds.cache.size}`)
        console.log(`Users : ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0 )}`)
    }
}

module.exports = event