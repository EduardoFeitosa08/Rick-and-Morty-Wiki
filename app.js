'use strict'

const logo = document.getElementById('logo')

const main = document.getElementById('main')

const sectionCharacter = document.getElementById('sectionCharacter')
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

const sectionCredits = document.getElementById('credits')

async function buscarTodosPersonagens() {
    const url = 'https://rickandmortyapi.com/api/character'
    const response = await fetch(url)
    const imagens = await response.json()
    // console.log(imagens)
    return imagens
}

async function buscarPersonagemById(id) {
    const url = `https://rickandmortyapi.com/api/character/${id}`
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

async function carregarPersonagemSolo(personagem){

    const scrollImgs = document.querySelector('.other-characters-section')
    if(scrollImgs){
        scrollImgs.remove()
    }   
    const creditsSection = document.querySelector('.credits-section')
    if(creditsSection){
        creditsSection.remove()
    }

    const divInfo = document.createElement('div')
    const img = document.createElement('img')

    const divName = document.createElement('div')
    const h2Name = document.createElement('h2')
    const pName = document.createElement('p')

    const divStatus = document.createElement('div')
    const h2Status = document.createElement('h2')
    const pStatus = document.createElement('p')

    const divGender = document.createElement('div')
    const h2Gender = document.createElement('h2')
    const pGender = document.createElement('p')

    const divFirstSeen = document.createElement('div')
    const h2FirstSeen = document.createElement('h2')
    const pFirstSeen = document.createElement('p')

    const divLastSeen = document.createElement('div')
    const h2LastSeen = document.createElement('h2')
    const pLastSeen = document.createElement('p')

    const sectionScrollCharacters = document.createElement('section')
    const h2OtherCharacters = document.createElement('h2')
    const divScrollImg = document.createElement('div')

    sectionCredits.remove()
    

    sectionCharacter.textContent = ''
    sectionCharacter.classList.remove('characters-section')
    sectionCharacter.classList.add('solo-character-section')

    img.src = personagem.image

    h2Name.textContent = 'Name:'
    pName.textContent = personagem.name
    divName.append(h2Name, pName)

    h2Status.textContent = 'Status:'
    pStatus.textContent = personagem.status
    divStatus.append(h2Status, pStatus)

    h2Gender.textContent = 'Gender:'
    pGender.textContent = personagem.gender
    divGender.append(h2Gender, pGender)

    h2FirstSeen.textContent = 'First Seen in:'
    pFirstSeen.textContent = personagem.origin.name
    divFirstSeen.append(h2FirstSeen, pFirstSeen)

    h2LastSeen.textContent = 'Last Seen in:'
    pLastSeen.textContent = personagem.location.name
    divLastSeen.append(h2LastSeen, pLastSeen)

    divInfo.append(divName, divStatus, divGender, divFirstSeen, divLastSeen)

    divInfo.classList.add('character-info')
    sectionCharacter.append(img, divInfo)

    const personagens = await buscarTodosPersonagens()
    personagens.results.forEach(function(personagem){
        const div = document.createElement('div')
        const imagem = document.createElement('img')
        const nome = document.createElement('h4')

        imagem.src = personagem.image
        nome.textContent = personagem.name

        div.appendChild(imagem)
        div.appendChild(nome)
        divScrollImg.appendChild(div)

        imagem.addEventListener('click', async function(){
            const personagemSelecionado = await buscarPersonagemById(personagem.id)
            // console.log(personagemSelecionado)
            carregarPersonagemSolo(personagemSelecionado)
        })
    })

    h2OtherCharacters.textContent = 'Other Characters'
    divScrollImg.classList.add('scroll-img')
    sectionScrollCharacters.append(h2OtherCharacters, divScrollImg)
    sectionScrollCharacters.classList.add('other-characters-section')
    main.append(sectionScrollCharacters)

    carregarCreditos()

    img.addEventListener('click', function(){
        window.open(personagem.image)
    })
}

async function carregarPersonagens(personagem) {
    const div = document.createElement('div')
    const img = document.createElement('img')
    const nome = document.createElement('h4')

    img.src = personagem.image
    nome.textContent = personagem.name

    div.appendChild(img)
    div.appendChild(nome)
    container.appendChild(div)

    img.addEventListener('click', async function(){
        const personagemSelecionado = await buscarPersonagemById(personagem.id)
        // console.log(personagemSelecionado)
        carregarPersonagemSolo(personagemSelecionado)

    })

}

async function carregarSectionPersonagens(personagem){
    sectionCharacter.textContent = ''

    const divCharacters = document.createElement('div')
    const divCharactersFilters = document.createElement('div')
    const h2FilterBy = document.createElement('h2')
    const h3Status = document.createElement('h3')

    const divStatusFilter = document.createElement('div')
    const divStatusAlive = document.createElement('div')
    const btnStatusAlive = document.createElement('button')
    const pStatusAlive = document.createElement('p')

    const divStatusDead = document.createElement('div')
    const btnStatusDead = document.createElement('button')
    const pStatusDead = document.createElement('p')

    const divStatusUnknown = document.createElement('div')
    const btnStatusUnknown = document.createElement('button')
    const pStatusUnknown = document.createElement('p')

    const h3Gender = document.createElement('h3')
    const divGenderFilter = document.createElement('div')
    const divMaleGender = document.createElement('div')
    const btnMaleGender = document.createElement('button')
    const pMaleGender = document.createElement('p')

    const divFemaleGender = document.createElement('div')
    const btnFemaleGender = document.createElement('button')
    const pFemaleGender = document.createElement('p')

    const divGenderless = document.createElement('div')
    const btnGenderless = document.createElement('button')
    const pGenderless = document.createElement('p')

    const divUnknownGender = document.createElement('div')
    const btnUnknownGender = document.createElement('button')
    const pUnknownGender = document.createElement('p')

    const divShowCharacters = document.createElement('div')
    divShowCharacters.classList.add('show-characters')
    divShowCharacters.id = 'showCharacters'

    h2FilterBy.textContent = 'Filter By:'
    h3Status.textContent = 'Status:'

    btnStatusAlive.textContent = 'Alive'
    btnStatusAlive.classList.add('btn_status')
    pStatusAlive.textContent = 'Alive'
    divStatusAlive.append(btnAlive, pStatusAlive)

    btnStatusDead.textContent = 'Dead'
    btnStatusDead.classList.add('btn_status')
    pStatusDead.textContent = 'Dead'
    divStatusDead.append(btnStatusDead, pStatusDead)

    btnStatusUnknown.textContent = 'Unknown'
    btnStatusUnknown.classList.add('btn_status')
    pStatusUnknown.textContent = 'Unknown'
    divStatusUnknown.append(btnStatusUnknown, pStatusUnknown)

    divStatusFilter.classList.add('status-filter')
    divStatusFilter.append(divStatusAlive, divStatusDead, divStatusUnknown)
    

    h3Gender.textContent = 'Gender:'

    btnMaleGender.textContent = 'Male'
    btnMaleGender.classList.add('btn_status')
    pMaleGender.textContent = 'Male'
    divMaleGender.append(btnMaleGender, pMaleGender)

    btnFemaleGender.textContent = 'Female'
    btnFemaleGender.classList.add('btn_status')
    pFemaleGender.textContent = 'Female'
    divFemaleGender.append(btnFemaleGender, pFemaleGender)

    btnGenderless.textContent = 'Genderless'
    btnGenderless.classList.add('btn_status')
    pGenderless.textContent = 'Genderless'
    divGenderless.append(btnGenderless, pGenderless)

    btnUnknownGender.textContent = 'Unknown'
    btnUnknownGender.classList.add('btn_status')
    pUnknownGender.textContent = 'Unknown'
    divUnknownGender.append(btnUnknownGender, pUnknownGender)

    divGenderFilter.classList.add('status-filter')
    divGenderFilter.append(divMaleGender, divFemaleGender, divGenderless, divUnknownGender)

    divCharactersFilters.classList.add('characters-filters')
    divCharactersFilters.append(h2FilterBy, h3Status ,divStatusFilter, h3Gender, divGenderFilter)

    sectionCharacter.classList.remove('solo-character-section')
    sectionCharacter.classList.add('characters-section')
    

    for(let i = 0; i < personagem.results.length; i++){
        const personagem1 = personagem.results[i]

        const div = document.createElement('div')
        const img = document.createElement('img')
        const nome = document.createElement('h4')

        img.src = personagem1.image
        nome.textContent = personagem1.name
        div.append(img, nome)

        img.addEventListener('click', async function(){
            const personagemSelecionado = await buscarPersonagemById(personagem1.id)
            // console.log(personagemSelecionado)
            carregarPersonagemSolo(personagemSelecionado)

        })

        divShowCharacters.append(div)
    }

    divCharacters.classList.add('characters')
    divCharacters.append(divCharactersFilters, divShowCharacters)

    sectionCharacter.append(divCharacters)
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

function carregarCreditos() {
    const sectionCredits = document.createElement('section')
    const divCredits = document.createElement('div')

    const divTvShow = document.createElement('div')
    const h3TvShow = document.createElement('h3')
    const pTvShow = document.createElement('p')

    const divApiDev = document.createElement('div')
    const h3ApiDev = document.createElement('h3')
    const pApiDev = document.createElement('p')

    const divSocial = document.createElement('div')
    const divSocialLinks = document.createElement('div')
    const aGitHub = document.createElement('a')
    const imgGitHub = document.createElement('img')
    const aLinkedin = document.createElement('a')
    const imgLinkedin = document.createElement('img')
    const h4DevName = document.createElement('h4')
    const spanDevName = document.createElement('span')

    sectionCredits.textContent = ''

    h3TvShow.textContent = 'Rick And Morty'
    pTvShow.textContent = 'Rick and Morty is created by Justin Roiland and Dan Harmon for Adult Swim. The data and images are used without claim of ownership and belong to their respective owners.'
    divTvShow.append(h3TvShow, pTvShow)

    h3ApiDev.textContent = 'Api developed by'
    pApiDev.textContent = 'Axel Fuhrmann a guy who likes to develop things and Talita, the "Rick and Morty data scientist" and hardcore fan.'
    divApiDev.append(h3ApiDev, pApiDev)

    divCredits.append(divTvShow, divApiDev)
    divCredits.classList.add('credits')

    imgGitHub.src = './img/GitHub.png'
    imgLinkedin.src = './img/LinkedIn.png'

    aGitHub.href = 'https://github.com/EduardoFeitosa08'
    aGitHub.target = '_blank'
    aGitHub.appendChild(imgGitHub)

    aLinkedin.href = 'https://www.linkedin.com/in/eduardo-batista-ab0910366/'
    aLinkedin.target = '_blank'
    aLinkedin.appendChild(imgLinkedin)

    divSocialLinks.append(aGitHub, aLinkedin)

    spanDevName.textContent = '< >'
    const devName = `by Eduardo Feitosa Batista`
    h4DevName.append(spanDevName, devName)
    divSocial.append(divSocialLinks, h4DevName)
    divSocial.classList.add('social')

    sectionCredits.append(divCredits, divSocial)
    sectionCredits.classList.add('credits-section')
    sectionCredits.id = 'credits'
    main.appendChild(sectionCredits)

}

logo.addEventListener('click', async function() {
    window.location.href = './index.html'
})

inputPersonagem.addEventListener('keydown', async(evento) => {
    if(evento.key === 'Enter' || evento.keyCode === 13){
        container.textContent = ''
        const imagens = await buscarPersonagemByName(inputPersonagem.value)
        imagens.results.forEach(carregarPersonagens)
        carregarSectionPersonagens(imagens)
        
        const scrollImgs = document.querySelector('.other-characters-section')
        if(scrollImgs){
            scrollImgs.remove()
        }
        
    }
})

btnSearch.addEventListener('click', async function() {
    container.textContent = ''
    const imagens = await buscarPersonagemByName(inputPersonagem.value)
    imagens.results.forEach(carregarPersonagens)
    carregarSectionPersonagens(imagens)

    const scrollImgs = document.querySelector('.other-characters-section')
        if(scrollImgs){
            scrollImgs.remove()
    }
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
}