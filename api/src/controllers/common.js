function getParticipant(participants, puuid) {
	const participant = participants.find(participant => {
		if(participant.puuid === puuid) return participant
	})
	return participant
}

module.exports.getParticipant = getParticipant