const axios = require('axios');

//retourne une liste d'item envoyé par l'API item
async function getItems() {
    let items = await axios.get('https://cookit.proxy.beeceptor.com/items');
    return items.data;
}

//retourne une liste de proteines de l'API proteines
async function getProteins() {
    let proteins = await axios.get('https://cookit.proxy.beeceptor.com/proteins');
    return proteins.data;
}

//retourne la liste d'items en fonction de la liste donnée dans la requête post
async function getItemsByIds(recipeIds, items) {
    return currentItems = items.filter(item => recipeIds.includes(item.id));
}

//retourne la station en fonction 
function getItemStations(items, proteins) {
    let stations = [];

    items.forEach(item => {
        //ajoute la station pour l'item courant
        stations.push(item.station);
        //s'il y a de la viande rajoute la station de la viande
        if (item.displayName.charAt(3) !== '-') {
            let currentProteins = proteins.filter(protein => protein.code === item.displayName.charAt(3))
            currentProteins.forEach(protein => stations.push(protein.station))
        }
    })
    return stations;
}

module.exports = {
    getItems,
    getProteins,
    getItemsByIds,
    getItemStations
}