'use strict'

const container = document.getElementById('showCharacters')
const inputPersonagem = document.getElementById('inputPersonagem')
const btnSearch = document.getElementById('btnSearch')

const personagemSelected = {}

async function buscarTodosPersonagens() {
    const url = 'https://rickandmortyapi.com/api/character'
    const response = await fetch(url)
    const imagens = await response.json()
    console.log(imagens)
    return imagens
}

async function buscarPersonagemByName(nome) {
    const url = `https://rickandmortyapi.com/api/character/?name=${nome}`
    const response = await fetch(url)
    const imagens = await response.json()
    console.log(imagens)
    return imagens
}

async function carregarPersonagens(personagem) {
    const div = document.createElement('div')
    const img = document.createElement('img')
    const nome = document.createElement('h4')

    img.src = await personagem.image
    nome.textContent = await personagem.name

    div.appendChild(img)
    div.appendChild(nome)
    container.appendChild(div)

    img.addEventListener('click', async function(){
        window.open(personagem.image)
    })
}

inputPersonagem.addEventListener('keydown', async(evento) => {
    if(evento.key === 'Enter' || evento.keyCode === 13){
        container.textContent = ''
        const imagens = await buscarPersonagemByName(inputPersonagem.value)
        imagens.results.forEach(carregarPersonagens)
    }
})

btnSearch.addEventListener('click', async function() {
    container.textContent = ''
    const imagens = await buscarPersonagemByName(inputPersonagem.value)
    imagens.results.forEach(carregarPersonagens)
})

window.onload = async function(){
    const personagens = await buscarTodosPersonagens()
    personagens.results.forEach(carregarPersonagens)
}