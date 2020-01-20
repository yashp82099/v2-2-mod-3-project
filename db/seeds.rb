# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'rest-client'
require 'json'

url = 'https://deckofcardsapi.com/api/deck/new/draw/?count=52'
res = RestClient.get(url)
cards = JSON.parse(res)

cards['cards'].each{ |card| Card.create(suit: card['suit'], value: card['value'], image: card['image'], code: card['code'])}








user1 = User.create(name: "gary", coin: 1000)
user2 = User.create(name: "yash", coin: 1000)
user3 = User.create(name: "kevin", coin: 1000)
user4 = User.create(name: "javi", coin: 1000)


game1 = Game.create(title: 'BlackJack')
game2 = Game.create(title: "Slot Machine")


UserGame.create(user_id: user1.id, game_id: game1.id, score: 0)
UserGame.create(user_id: user1.id, game_id: game2.id, score: 0)
UserGame.create(user_id: user2.id, game_id: game2.id, score: 0)
UserGame.create(user_id: user3.id, game_id: game1.id, score: 0)
UserGame.create(user_id: user4.id, game_id: game2.id, score: 0)
UserGame.create(user_id: user4.id, game_id: game1.id, score: 0)


