const { MessageEmbed } = require("discord.js");
const axios = require('axios');

module.exports = {
  name: "profile",
  aliases: ["p"],
  description: "Gets Your current Habitica Profile",
  async execute(message) {

    let response = await axios.get('https://habitica.com/api/v3/members/c381b269-1894-484a-8b73-ff121539ec5c', {
        headers:{
            'x-api-user': message.client.HABITICA_API_USER,
            'x-api-key': message.client.HABITICA_API_KEY
        }
    });
    if (response.status !== 200) {
        return message.channel.send(':x: **Something Went Wrong!**').catch(console.error);
    } else if (!response.data.success) {
        return message.channel.send(':x: **Something Went Wrong!**').catch(console.error); 
    }

    let data = response.data.data

    let username = data.profile.name

    CharacterHealth = data.stats.hp
    CharacterExp = data.stats.exp
    CharacterClass = data.stats.class
    CharacterLvl = data.stats.lvl
    
    let userId = data.id

    let briefInfo = `Health: \`${CharacterHealth}\` | Experience: \`${CharacterExp}\` | Level: \`${CharacterLvl}\` | Class: \`${CharacterClass}\``

    let ProfileEmbed = new MessageEmbed()
    .setTitle(`${username}'s Profile`).setURL(`https://habitica.com/profile/${userId}`)
    .setDescription(briefInfo)
    .setColor("#4f2a93")
    .setTimestamp();

    Object.keys(data.items.pets).map((pet, amount) => {
        ProfileEmbed.addField(pet, amount, false);
    })

    return message.channel.send(ProfileEmbed).catch(console.error);

}
};