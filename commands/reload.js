// This command reloads other commands, using the command handler
exports.run = (client, message, args, ops) => {
  // ops is an extra argument. we can choose what to pass into it via the app.js file
  // We can access ops.ownerID and it will return the ID defined at the top of app.js

  // check if author is the bot owner
  if (message.author.id !== ops.ownerID)
  {
    return message.channel.send('Sorry, only the owner can use this command.')
    // If the 2 IDs are not the same, it will return and send a message to the channel
  }

  // Delete from cache
  try // this will be a try statement in case the command isn't found
  {
    delete require.cache[require.resolve(`./${args[0]}.js`)]
    // Since we're already in the commands folder, we don't need to specify it.
  } catch (e)
  {
    // If we encounter an error, return and respond in chat
    return message.channel.send(`Unable to reload: ${args[0]}`)
  }

  // Finally, send an output if it hasn't returned yet
  message.channel.send(`Successfully reloaded: ${args[0]}`)
}
