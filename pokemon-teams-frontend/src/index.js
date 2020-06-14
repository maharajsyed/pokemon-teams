/*
- When a user loads the page, they should see all
  trainers, with their current team of Pokemon.
    -fetch trainers {get requent to /trainer}
    -domcontent loader
    -render trainers info
    -render pokemons info


- Whenever a user hits `Add Pokemon` and they have
  space on their team, they should get a new Pokemon.
    -add click listener on add button
    -post request to /pokemon
    -if space then add pokemon


- Whenever a user hits `Release Pokemon` on a specific
  Pokemon team, that specific Pokemon should be released from
  the team.
    -add click listener on delete button
    -delete request to /pokemon
    
*/



document.addEventListener("DOMContentLoaded", (e) => {
    
    const BASE_URL = "http://localhost:3000"
    const TRAINERS_URL = `${BASE_URL}/trainers`
    const POKEMONS_URL = `${BASE_URL}/pokemons`

    //getting the trainers:
    //rendering the trainers:
    const getTrainers = () => {
        fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(trainers => {
         renderTrainers(trainers)
        })
    }
    //selecting a trainer from array of trainers:  **why do i need to do this twice?**
    //iterates over trainer collection and calls each trainer
    const renderTrainers = trainers => {
        trainers.forEach(trainer => {
         renderTrainer(trainer)
        })
    }
    //getting each single trainer rendered:     **why should i call render trainer**
    const renderTrainer = trainer => {

        // render trainer material { div, p, button, li }:
        // render pokemon material { li } {'id' is unique in a dataset!}:
        
        // console.log(trainer)

        //creating the div item:    
        const div = document.createElement('div')
        div.classname = "card"
        div.dataset.id = trainer.id
        
        // render trainer material { div, p, button, li }:
        div.innerHTML = `
            <p>${trainer.name}</p>
            <button data-trainer-id="${trainer.id}">Add Pokemon</button>
            `
        
        // render pokemon material { li }: 
        const ul = document.createElement("ul")

        trainer.pokemons.forEach(pokemon => {
            const pokemonLi = createPokemonLi(pokemon)
            ul.append(pokemonLi)
        })

        div.append(ul)

        const main = document.querySelector("main")
        main.append(div)
    }

    //creating pokemon li material:
    const createPokemonLi = pokemon => {
        const li = document.createElement('li')

        //rendering inner Li material for pokemon
        li.innerHTML = `"${pokemon.nickname}" ("${pokemon.species}") 
        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`

        return li
    }

    document.addEventListener('click', e =>{
        if (e.target.textContent === 'Add Pokemon'){
            const button = e.target
            const trainerId = e.target.dataset.trainerId

        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({ trainer_id: trainerId })
        })
        .then(resp => resp.json())
        .then(pokemon => {
           if (pokemon.error) {
             alert(pokemon.error)
           } else {
               const pokemonLi = createPokemonLi(pokemon)
               const ul = button.parentNode.querySelector('ul')
               ul.append(pokemonLi)
           }
        })


      } else if (e.target.className === 'release'){
          const button = e.target
          const id = button.dataset.pokemonId
          const li = button.parentNode
          li.remove( )

          fetch(`${POKEMONS_URL}/${id}`, {
              method: "DELETE"   
          })
        }
    })  
    

    getTrainers()
})     