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
    if (!runMachine) {
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

}

const updateMoney = (value) => {
    let moneySpan = document.getElementById('money')
    let money = Number(moneySpan.innerText)
    money += value
    moneySpan.innerText = money
    console.log(money)
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
            } else {
                updateMoney(playedMoney*15)
            }
        }

        //condicao 2 numeros iguais
        else if (result[0] === result[1] || result [1] === result[2] || result[0] === result[2]){
            if (quantitySeven === 2) {
                updateMoney(playedMoney*75)
            } else {
                updateMoney(playedMoney)
            }
        }

        //perdeu
        else {
            updateMoney(-playedMoney)
        }



    } else {
        console.log('Maquina ja esta parada')
    }
    

}

let playedMoney = 200
let runMachine = false

let btnRunMachine = document.getElementById('runMachine')
let btnStopMachine = document.getElementById('stopMachine')

btnRunMachine.addEventListener('click', runMachineSlots)
btnStopMachine.addEventListener('click', getScore)