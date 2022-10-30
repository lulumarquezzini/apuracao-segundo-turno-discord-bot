const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('primeiroturno')
		.setDescription('Dados finais do primeiro turno segundo o TSE'),
	async execute(interaction) {
        const response = await fetch("https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json")
        .then(data => data.json())

		const exampleEmbed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('Apuração primeiro turno')
		.setDescription('Dados finais do primeiro turno')
        .setFooter({ text: 'Última atualização ' + response.dg + " " + response.hg});

		const candidates = response.cand.slice(0,8)
        
		candidates.forEach(candidate => {
			exampleEmbed.addFields(
				{ name: 'Candidato', value: candidate.nm, inline: true },
				{ name: 'Votos', value: candidate.vap, inline: true },
				{ name: 'Porcentagem', value: candidate.pvap + '%', inline: true },
			)
		})

		return interaction.reply({ embeds: [exampleEmbed] });
	},
};