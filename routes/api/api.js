const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");
// const scoreController = require("../../controllers/scoreController");

router.route("/scores")
    .get(function(req, res){
        console.log("hit scraper");
        let scores = {};
        axios.get("https://basketball-reference.com/boxscores/").then(function(response){
            let $ = cheerio.load(response.data);
            scores.nba = {};
            scores.nba.title = $("div#wrap")
                .children("div#content")
                .children("h1").text().trim();
            scores.nba.games = $("div#wrap")
                .children("div#content")
                .children("div.section_heading")
                .children("h2").text().trim();
            scores.nba.winner = [];
            $("div.game_summaries").children("div").map(function(i, elem){
                scores.nba.winner[i] = `${$(this).children("table.teams")
                    .children("tbody")
                    .children("tr.winner")
                    .children("td")
                    .children("a").text().slice(0, -5).trim()} ${$(this).children("table.teams")
                    .children("tbody")
                    .children("tr.winner")
                    .children("td.right").eq(0).text().trim()}`;
            });
            scores.nba.loser = [];
            $("div.game_summaries").children("div").map(function(i, elem){
                scores.nba.loser[i] = `${$(this).children("table.teams")
                    .children("tbody")
                    .children("tr.loser")
                    .children("td")
                    .children("a").text().trim()} ${$(this).children("table.teams")
                    .children("tbody")
                    .children("tr.loser")
                    .children("td.right").eq(0).text().trim()}`;
            });
            axios.get("https://hockey-reference.com/boxscores/").then(function(response){
                let $ = cheerio.load(response.data);
                scores.nhl = {};
                scores.nhl.title = $("div#wrap")
                    .children("div#content")
                    .children("h1").text().trim();
                scores.nhl.winner = [];
                $("div.game_summaries").children("div").map(function(i, elem){
                    scores.nhl.winner[i] = `${$(this).children("table.teams")
                        .children("tbody")
                        .children("tr.winner")
                        .children("td")
                        .children("a").eq(0).text().trim()} ${$(this).children("table.teams")
                        .children("tbody")
                        .children("tr.winner")
                        .children("td.right").eq(0).text().trim()}`;
                });
                scores.nhl.loser = [];
                $("div.game_summaries").children("div").map(function(i, elem){
                    scores.nhl.loser[i] = `${$(this).children("table.teams")
                        .children("tbody")
                        .children("tr.loser")
                        .children("td")
                        .children("a").eq(0).text().trim()} ${$(this).children("table.teams")
                        .children("tbody")
                        .children("tr.loser")
                        .children("td.right").eq(0).text().trim()}`;
                });
                res.send(scores);
            });
        });
    });

module.exports = router;