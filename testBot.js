const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')

// Constant Variables
const prefix = config.prefix
const ownerID = config.ownerID

// Listener events
client.on('message', message => {
  // Runs whenever a new message is sent to a channel the bot can see

  // Variables
  let sender = message.author
  let args = message.content.slice(prefix.length).trim().split(' ')
  let cmd = args.shift().toLowerCase()

  // cmd contains the command following the prefix
  // args contains everything following the command, split into an array by spaces

  // Return statements, bot will ignore messages sent by bots or messages that don't start with prefix
  if (message.author.bot)
  {
    return // This will ignore all bots
  }
  if (!message.content.startsWith(prefix))
  {
    return // This will ignore any messages that don't start with the prefix
  }

  // Command Handler
  try
  {
    // Bonus: Auto-Reload (should be moved into its own command)
    delete require.cache[require.resolve(`./commands/${cmd}.js`)]

    // Options
    let ops = {
      ownerID: ownerID
    }

    let commandFile = require(`./commands/${cmd}.js`) // This will require a file in the commands folder. The file must have the same name as the command
    commandFile.run(client, message, args, ops) // This will pass 4 variables into the file
  } catch (e) // This will catch any errors, either written in the code or if the command doesn't exist
  {
    console.log(e.stack)
  } finally
  {
    console.log(`${message.author.tag} ran the command ${cmd}`)
  }
})

// Ready event - runs when bot starts
client.on('ready', () => console.log('Launched'))

// Discord Login
client.login(config.token)
