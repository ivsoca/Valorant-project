const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const agentId = urlParams.get('agentId');
let agent;

function start() {
	
	if (!agentId) {
		window.open('index.html', '_self');
	}

	const request = new Request('https://valorant-api.com/v1/agents/' + agentId);
	
	fetch(request).then((data) => {
		return data.json();
	}).then((json) => {
		this.agent = json.data;
		showAgent();
	});
}

function showAgent() {
	let containerDiv = document.getElementById('container');
	let divHeader = document.createElement('div');
	divHeader.id = 'header';
	divHeader.className = 'header';

	let agentImage = document.createElement('img');
	agentImage.src = this.agent.fullPortrait;
	agentImage.className = 'agentImage';

	divHeader.appendChild(agentImage);
	containerDiv.appendChild(divHeader);
}

start();