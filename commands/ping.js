// This command will be activated using _ping since the filename is ping and the prefix is _

exports.run = (client, message, args) => {
  message.channel.send('Some other text')
}
