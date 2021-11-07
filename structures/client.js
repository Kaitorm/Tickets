const { Client, Intents, Collection } = require("discord.js");
const {TicketManager} = require('discord-tickets');
const { readdirSync } = require("fs");

class Tickets extends Client {
    constructor(options = { intents: Object.values(Intents.FLAGS) }) {
        super(options)
        this.commands = new Collection()
        this.config = require("../config");
        this.ticketManager = new TicketManager(this, {
            enabled: true,
            parentId: this.config.ticketsCategory,
            staffRole: this.config.staffRole,
            channelTopic: true,
            storage: '../tickets.json',
            ticketCache: true
        })
    }

    async loadEvents() {
        const files = readdirSync("./events")
        const filesName = files.map(file => file.replace(".js", ""))
        for(const fileName of filesName) {
            const event = require(`../events/${fileName}`)
            const data = new event()
            this.on(data.name, params => data.execute(params, this))
        }
    }

    async loadSlashCommands() {
        const files = readdirSync("./commands")
        const filesName = files.map(file => file.replace(".js", ""))
        for(const fileName of filesName) {
            const command = require(`../commands/${fileName}`)
            const data = new command()
            this.commands.set(data.name, data)
        }
    }

    async init() {
        process.on("unhandledRejection", (error) => console.log(error.stack))
        await this.loadEvents()
        await this.loadSlashCommands()
        await this.login(this.config.token)
        await this.user.setActivity({ name: `${this.guilds.cache.size} guilds` })
    }
}

module.exports = Tickets