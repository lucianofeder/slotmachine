const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

const setProbabilityArray = () => {
    let maxPossibleResults = 9
    let bestResult = 7
    let decreaseBestOdds = 3 // um valor usado para spammar as outras possibilidades com excecao ao bestResult
    let resultArr= []
    for (let i = 1; i <= maxPossibleResults; i++) {
        if (i != bestResult) {
            for (let j = 0; j < decreaseBestOdds; j++) {
                resultArr.push(i)
            }
        } else {
            resultArr.push(i)
        }
    }
    return resultArr
}

const getSlotValues = (arr) => {
    let maxValueToRandom = arr.length -1
    let valuePosition = Math.floor(Math.random()*maxValueToRandom + 1)
    return arr[valuePosition]
}

const updateSlot = (slot, value) => {
    let img = document.getElementById(`slot-${slot}`)
    img.src = `./img/${value}.png`
    img.alt = `Slot machine Value ${value}`
    img.dataset.value = value
}

const getResultValue = () => {
    let valueArr= []
    for (let i = 1; i <= 3; i++) {
        let img = document.getElementById(`slot-${i}`)
        let value = img.dataset.value
        valueArr.push(value)
    } 
    return valueArr 
}

const stopMachineSlots = () => {runMachine = false}

const runMachineSlots = async () => {
    let money = getMoney()
    if (!money <= playedMoney) {
        if (!runMachine) {
            setText()
            runMachine = true
            let probabilityArr = setProbabilityArray ()
            while (runMachine) {
                updateSlot(1, getSlotValues(probabilityArr))
                updateSlot(2, getSlotValues(probabilityArr))
                updateSlot(3, getSlotValues(probabilityArr))
                await sleep(100)
            }
        } else {
            console.log('Maquina ja esta rodando')
        }
    } else {
        window.alert('Infelizmente seu dinheiro esgotou, faca um deposito para continuar')
    }
    

}

const getMoney = () => {
    let moneySpan = document.getElementById('money')
    let money = Number(moneySpan.innerText)
    return money
}

const updateMoney = (value) => {
    let moneySpan = document.getElementById('money')
    let money = Number(moneySpan.innerText)
    money += value
    moneySpan.innerText = money
    animateAcress(value)
}

const updateNumberOfPlays = () => {
    let playCountSpan = document.getElementById('playCount')
    let playCount = Number(playCountSpan.innerText)
    playCount++
    playCountSpan.innerText = playCount

}

const getScore = () => {
    if (runMachine) {
        stopMachineSlots()
        updateNumberOfPlays()
        let result = getResultValue()
        let quantitySeven = result.filter(x => x === 7).length
        // condicao dos 3 numeros iguais
        if (result[0] === result[1] && result [1] === result[2]) {
            if (quantitySeven === 3) {
                updateMoney(playedMoney*1000)
                setThree7WinPhrase()
            } else {
                updateMoney(playedMoney*15)
                setThreeWinPhrase()
            }
        }

        //condicao 2 numeros iguais
        else if (result[0] === result[1] || result [1] === result[2] || result[0] === result[2]){
            if (quantitySeven === 2) {
                updateMoney(playedMoney*75)
                setTwo7WinPhrase()
            } else {
                updateMoney(playedMoney)
                setTwoWinPhrase()
            }
        }

        //perdeu
        else {
            updateMoney(-playedMoney)
            setLosePhrase()
        }



    } else {
        console.log('Maquina ja esta parada')
    }
    

}

const setText = (text="Rrrroooodaaaando!!!") => {
    let computerSays = document.getElementById('computerSays')
    computerSays.innerText = text
}



const setLosePhrase = () => {
    let phrases = [
        'Mais sorte da proxima vez amigao.',
        'Hoje nao, hoje nao.',
        'Que pena, voce errou.',
        'Tente novamente.',
        'Parece que o 777 chegou nem perto desta vez.',
        'Essa sua sorte eim amigo, tenta mais uminha.'
    ]

    let randomPos = Math.ceil(Math.random()*(phrases.length -1))
    console.log(randomPos)
    setText(phrases[randomPos])
}

const setTwoWinPhrase = () => {
    let phrases = [
        'Pelo menos da pra continuar jogando',
        'Chegou perto, parabens!',
        'Famoso grao em grao.',
    ]

    let randomPos = Math.ceil(Math.random()*(phrases.length -1))
    setText(phrases[randomPos])
}

const setThreeWinPhrase = () => {
    let phrases = [
        'Ta pegando fogo bixo.',
        'Parabens ja consegue pagar o aluguel.',
        'Vou ter que chamar o Gerente, ta ganhando tudo!'
    ]

    let randomPos = Math.ceil(Math.random()*(phrases.length -1))
    setText(phrases[randomPos])
}

const setThree7WinPhrase = () => {
    let phrases = [
        'DING DING DING DING, Parabens!!!'
    ]
    let randomPos = Math.ceil(Math.random()*(phrases.length -1))
    setText(phrases[randomPos])
}

const setTwo7WinPhrase = () => {
    let phrases = [
        'Winner Winner,Chicken Dinner!'
    ]

    let randomPos = Math.ceil(Math.random()*(phrases.length -1))
    setText(phrases[randomPos])
}

const animateAcress = async (value) => {
    let span = document.getElementById('hiddenAcress')
    if (value > 0) {
        span.innerText = `+${value}`
        span.classList.remove(`textRed`)
        span.classList.add('textGreen')
    } else {
        span.innerText = `${value}`
        span.classList.remove(`textGreen`)
        span.classList.add('textRed')
    }
    
    span.classList.remove('hide')
    await sleep(700)
    span.classList.add('hide')
}

let playedMoney = 400
let runMachine = false

let btnRunMachine = document.getElementById('runMachine')
let btnStopMachine = document.getElementById('stopMachine')

btnRunMachine.addEventListener('click', runMachineSlots)
btnStopMachine.addEventListener('click', getScore)