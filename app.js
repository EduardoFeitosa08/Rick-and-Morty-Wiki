'use strict'

const container = document.getElementById('showCharacters')
const inputPersonagem = document.getElementById('inputPersonagem')
const btnSearch = document.getElementById('btnSearch')

const btnStatus = document.querySelectorAll('button')

const btnAlive = document.getElementById('btnAlive')
const btnDead = document.getElementById('btnDead')
const btnUnknown = document.getElementById('btnUnknown')

const btnMale = document.getElementById('btnMale')
const btnFemale = document.getElementById('btnFemale')
const btnGenderless = document.getElementById('btnGenderless')
const btnGenderUnknown = document.getElementById('btnGenderUnknown')

async function buscarTodosPersonagens() {
    const url = 'https://rickandmortyapi.com/api/character'
    const response = await fetch(url)
    const imagens = await response.json()
    // console.log(imagens)
    return imagens
}

async function buscarPersonagemByName(nome) {
    const url = `https://rickandmortyapi.com/api/character/?name=${nome}`
    const response = await fetch(url)
    const imagens = await response.json()
    // console.log(imagens)
    return imagens
}

async function buscarPersonagemByPage(numPage) {
    const url = `https://rickandmortyapi.com/api/character/?page=${numPage}`
    const response = await fetch(url)
    const imagens = await response.json()
    console.log(imagens)
    return imagens
}

async function buscarPersonagemByStatus(status) {
    const url = `https://rickandmortyapi.com/api/character/?status=${status}`
    const response = await fetch(url)
    const imagens = await response.json()
    // console.log(imagens)
    return imagens
}

async function buscarPersonagemByGender(gender) {
    const url = `https://rickandmortyapi.com/api/character/?gender=${gender}`
    const response = await fetch(url)
    const imagens = await response.json()
    // console.log(imagens)
    return imagens
}

async function carregarPersonagemSolo(personagem) {
    const soloCharacterSection = document.getElementById('soloCharacterSection')
    const template = `
        <img src="${personagem.image}" alt="">
        <div>
            <h2>Name:</h2>
            <p>${personagem.name}</p>
        </div>
        <div>
            <h2>Status:</h2>
            <p>${personagem.status}</p>
        </div>
        <div>
            <h2>Gender:</h2>
            <p>${personagem.gender}</p>
        </div>
        <div>
            <h2>First seen in:</h2>
            <p>${personagem.origin.name}</p>
        </div>
        <div>
            <h2>Last seen in:</h2>
            <p>${personagem.location.name}</p>
        </div>`;

        soloCharacterSection.innerHTML = template
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
        window.location.href = './character.html'
    })

}

function carregarPaginas(numPagina) {
    const switchPages = document.getElementById('switchPages')
    
    for(let i = 1; i <= numPagina.info.pages; i++){
        const a = document.createElement('a')
        a.textContent = i
        switchPages.appendChild(a)
        a.addEventListener('click', async function() {
            const personagens = await buscarPersonagemByPage(i)
            container.textContent = ''
            personagens.results.forEach(carregarPersonagens)
        })
    }
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

btnStatus.forEach(button => {
    button.addEventListener('click', async () =>{
        btnStatus.forEach(selecionado => selecionado.classList.remove('selecionado'))
        button.classList.add('selecionado')
    })
})

btnAlive.addEventListener('click', async ()=>{
    const status = btnAlive.textContent
    const personagens = await buscarPersonagemByStatus(status)
    container.textContent = ''
    personagens.results.forEach(carregarPersonagens)
})

btnDead.addEventListener('click', async ()=>{
    const status = btnDead.textContent
    const personagens = await buscarPersonagemByStatus(status)
    container.textContent = ''
    personagens.results.forEach(carregarPersonagens)
})

btnUnknown.addEventListener('click', async ()=>{
    const status = btnUnknown.textContent
    const personagens = await buscarPersonagemByStatus(status)
    container.textContent = ''
    personagens.results.forEach(carregarPersonagens)
})

btnMale.addEventListener('click', async ()=>{
    const gender = btnMale.textContent
    const personagens = await buscarPersonagemByGender(gender)
    container.textContent = ''
    personagens.results.forEach(carregarPersonagens)
})

btnFemale.addEventListener('click', async ()=>{
    const gender = btnFemale.textContent
    const personagens = await buscarPersonagemByGender(gender)
    container.textContent = ''
    personagens.results.forEach(carregarPersonagens)
})

btnGenderless.addEventListener('click', async ()=>{
    const gender = btnGenderless.textContent
    const personagens = await buscarPersonagemByGender(gender)
    container.textContent = ''
    personagens.results.forEach(carregarPersonagens)
})

btnGenderUnknown.addEventListener('click', async ()=>{
    const gender = btnGenderUnknown.textContent
    const personagens = await buscarPersonagemByGender(gender)
    container.textContent = ''
    personagens.results.forEach(carregarPersonagens)
})

window.onload = async function(){
    const personagens = await buscarTodosPersonagens()
    personagens.results.forEach(carregarPersonagens)
    carregarPaginas(personagens)
    personagens.results.forEach(carregarPersonagemSolo)
}