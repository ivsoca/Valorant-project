let agentsConst;
let weaponConst;

//Get agentes y weapons
function getAgentByName(name) {
	if (!!this.agentsConst) {
		const agentsFound = this.agentsConst.filter(a => a.displayName.toLowerCase().startsWith(name.toLowerCase()));
		if(!!agentsFound && agentsFound.length > 0) { 
		document.getElementById("agentContainer").removeChild(document.getElementById('agents'));

		addAgentsIntoView(agentsFound) 

		console.log('Get agent ' + name);
		} else {
			noAgentExist()
			document.getElementById("agentContainer").removeChild(document.getElementById('agents'));
			let botonGetAgent = document.getElementById("getAgent")
			botonGetAgent.disabled = true
		}
	} 
}


function getWeaponByName(name) {
	if (!!this.weaponConst) {
		const weaponFound = this.weaponConst.filter(a => a.displayName.toLowerCase().startsWith(name.toLowerCase()));
		if(!!weaponFound && weaponFound.length > 0) {
			document.getElementById("weaponContainer").removeChild(document.getElementById('weapons'));

			addWeaponIntoView(weaponFound);

			console.log('Get weapon ' + name);
		} else {
			noWeaponExist()
			document.getElementById("weaponContainer").removeChild(document.getElementById('weapons'));
			let botonGetWeapon = document.getElementById("getWeapon")
			botonGetWeapon.disabled = true	
		}
 	}
}


function noWeaponExist() {
	const noWeapon = document.getElementById("otraLista")

		const li2 = document.createElement("li")
		li2.textContent = "No existe weapon con ese nombre"
		

		noWeapon.appendChild(li2)
}

function noAgentExist() {
	const noAgent = document.getElementById("lista") 

		const li = document.createElement("li")
		li.textContent = "No existe agente con ese nombre"

		noAgent.appendChild(li)
}


function addAgentsIntoView(agents) {
	const divChild = document.createElement('div');
	divChild.id = 'agents';

	document.getElementById("agentContainer").appendChild(divChild);

	agents.forEach(agent => {
		const span = document.createElement('span');
		span.id = agent.uuid;
		span.textContent = agent.displayName;

		const image = document.createElement('img');
		image.src = agent.displayIcon;
		image.width = 30;
		image.height = 30;
		image.style = "border.readius: 20px; margin-left: 10px; margin-right: 10px;"
		
		
		const agentDiv = document.createElement("div");
		agentDiv.className = "agent",
		agentDiv.appendChild(image);
		agentDiv.appendChild(span);
		agentDiv.addEventListener("click", () => goToAgent(agent.uuid));
		
		divChild.appendChild(agentDiv);

		// divChild.appendChild(document.createElement('div').appendChild(span));
		// divChild.appendChild(document.createElement('br'));
	});
}



function goToAgent(agentId) {
	window.open("agent.html?agentId="+agentId, "_self");
}




function addWeaponIntoView(weapons) {
	const divChild = document.createElement('div');
	divChild.id = 'weapons';

	document.getElementById("weaponContainer").appendChild(divChild);

	weapons.forEach(weapons => {
		const span = document.createElement('span');
		span.id = weapons.uuid;
		span.textContent = weapons.displayName;

		const image = document.createElement('img');
		image.src = weapons.displayIcon;
		image.width = 30;
		image.height = 30;
		image.style = "border.readius: 20px; margin-left: 10px; margin-right: 10px;"
		
		
		const weaponDiv = document.createElement("div");
		weaponDiv.className = "weapons",
		weaponDiv.appendChild(image);
		weaponDiv.appendChild(span);
		
		divChild.appendChild(weaponDiv);
		
		// weaponDiv.appendChild(document.createElement('div').appendChild(span));
		// weaponDiv.appendChild(document.createElement('br'));
	});
}





const getAgentBtn = document.getElementById("getAgent");
const getAgentField = document.getElementById("agentName");


function start() {


	getAgentBtn.addEventListener("click", () => {
		const value = getAgentField.value;
		getAgentByName(value);
});

fetch(requestAgent).then((data) => {
	return data.json();
})
.then((agents) => {
	console.log(agents);
	this.agentsConst = agents.data;

	addAgentsIntoView(agents.data)
});


}



	const botonReiniciarAgents = document.getElementById("ReloadAgents")

	botonReiniciarAgents.addEventListener("click", reiniciarWeb)


	const botonReiniciarWeapons = document.getElementById("ReloadWeapon")

	botonReiniciarWeapons.addEventListener("click", reiniciarWeb)

	function reiniciarWeb(){
    	location.reload()
   }



const getWeaponBtn = document.getElementById("getWeapon");
const getWeaponField = document.getElementById("weaponName");
getWeaponBtn.addEventListener("click", () => {
	const value1 = getWeaponField.value;
	getWeaponByName(value1);
});


const requestAgent = new Request('https://valorant-api.com/v1/agents');
const requestWeapon = new Request("https://valorant-api.com/v1/weapons")

//requestAgentes



//requestWeapons

fetch(requestWeapon).then((data) => {
	return data.json();
})
.then((weapons) => {
	console.log(weapons);
	this.weaponConst = weapons.data;

	addWeaponIntoView(weapons.data)
});

start();








