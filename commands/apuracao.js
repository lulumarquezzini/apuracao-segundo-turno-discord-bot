const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('apuracao')
		.setDescription('Mostra os dados atualizados do TSE'),
	async execute(interaction) {
		const response = await fetch("https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json")
        .then(data => data.json())

		const exampleEmbed = new EmbedBuilder()
		.setColor('#0099ff')
		.setTitle('Apuração segundo turno')
		.setDescription('Atualizado usando a api do tse')
        .setFooter({ text: 'Última atualização ' + response.dg + " " + response.hg});

		const candidates = response.cand
		
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