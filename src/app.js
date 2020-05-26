const express = require('express')
const path = require('path')
const hbs = require('hbs')
const singlePlayerGamesArray = require('./singlePlayerGamesArray.js')
const multiPlayerGamesArray = require('./multiPlayerGamesArray.js')

const partialsPath = path.join(__dirname, '../handlebars/partials')
hbs.registerPartials(partialsPath, error => {
    if (error) {
        console.log('could not find path: ' + partialsPath)
    }
})
const viewsPath = path.join(__dirname, '../handlebars/views')

const assets_path = path.join(__dirname, '../public')
const app = express()
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(assets_path))

app.get('', (req, res) => {
    res.render('index', {title: 'Welcome to Lazy Games'})
})

app.get('/single-player-games', (req, res) => {

    
    res.render('game-selection-screen', 
        {
            title: 'Single-player Games',
        games: singlePlayerGamesArray
    })
})
    // each single-player game
    app.get(singlePlayerGamesArray[0].extension_name, (req, res) => {
        res.render('each-game', {gameTitle: singlePlayerGamesArray[0].gameTitle})
    })


    app.get('/single-player-games/*', (req, res) => {
        const game = singlePlayerGamesArray.find(each => each.extension_name === req.path)
        if (game) {
            return res.render('each-game', {gameTitle: game.gameTitle})
        }
        res.render('404', {title: 'nosuch singleplayer game'})
    })

app.get('/multi-player-games', (req, res) => {
    res.render('game-selection-screen', {
        title: 'Multi-player Games',
                games: multiPlayerGamesArray
            })
})
// each multi-player game
app.get('/multi-player-games/*', (req, res) => {
    const game = multiPlayerGamesArray.find(each => each.extension_name === req.path)
    console.log(req.path)
    if (game) {
        return res.render('each-game', {gameTitle: game.gameTitle})
    }
    res.render('404',{title: 'nosuch multiplayer game'})
})

app.get('/*', (req, res) => {
    res.render('404', {title: '404'})
})
app.listen(3000, () => {
    console.log('running on port 3000')
})