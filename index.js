const express = require('express');
const app = express();
const services = require("./service/services");

app.use(express.json());

app.post('/items-stations', async function(req, res) {
    //récupération des id-Items envoyé dans la requête post
    const itemIds = req.body['item-ids'];

    //récupération d'une liste Item de l'API Item
    let items = await services.getItems();

    //récupération d'une liste de Proteines de l'API proteine 
    let proteins = await services.getProteins();

    //selections dans la liste item des items voulus grâce aux id-Items
    let currentItems = await services.getItemsByIds(itemIds, items);

    //selection dans la liste d'item, des items sans stock
    let outOfStocksItems = currentItems.filter(item => item.volume === 0);

    //creation de la liste des stations sans stock
    let outOfStockStations = [];
    outOfStocksItems.forEach(item => outOfStockStations.push(item.station))

    //selection dans la liste d'item, des items avec stock
    let picksItems = currentItems.filter(item => item.volume !== 0)

    //création de la liste des stations à récupérer en fonction de la liste d'item avec stock et de la liste de proteine
    let picksStations = services.getItemStations(picksItems, proteins);

    //création de la réponse avec la liste des stations à récuprérer et la liste des station sans stock
    return res.json({
        "picks": picksStations,
        "out-of-stock": outOfStockStations
    })

});

app.listen(8080, () => console.log('server started: 8080'));