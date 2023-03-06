const rangeElement = document.querySelector('#password-length')
const inputElement = document.querySelector('#password')
const upperCaseCheckElement = document.querySelector("#uppercase-check")
const numberCheckElement = document.querySelector('#number-check')
const symbolCheckElement = document.querySelector("#symbol-check")
const spanElement = document.querySelector('#password-length-text')
const securityIndicatorBar = document.querySelector('#security-indicator-bar')
const refreshBtn = document.querySelector('#refresh')
let passwordLength = 16

function generatePassword() {
    let chars = "abcdefghjkmnpqrstuvwxyz"
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if (upperCaseCheckElement.checked) {
        chars += upperCaseChars
    } 
    
    if (numberCheckElement.checked) {
        chars += numberChars
    } 
    
    if (symbolCheckElement.checked) {
        chars += symbolChars
    }

    let password = ""
    
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1) // recorta uma string de um lugar inicial ate a final
    }
    
    inputElement.value = password
    calculateQuality()
    calculateFontSize()
}

function calculateQuality() {
    const percent = Math.round(
        (passwordLength / 64) * 25 + 
        (upperCaseCheckElement.checked ? 15 : 0) +
        (numberCheckElement.checked ? 25 : 0) + 
        (symbolCheckElement.checked ? 35 : 0 )
    )

    securityIndicatorBar.style.width = `${percent}%`

    if (percent > 69) {
        securityIndicatorBar.classList.remove('critical')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.add('safe')
    } else if (percent > 50) {
        securityIndicatorBar.classList.remove('critical')
        securityIndicatorBar.classList.remove('safe')
        securityIndicatorBar.classList.add('warning')
    } else {
        securityIndicatorBar.classList.remove('safe')
        securityIndicatorBar.classList.remove('warning')
        securityIndicatorBar.classList.add('critical')
    }

    if (percent >= 100) {
        securityIndicatorBar.classList.add('completed')
    } else {
        securityIndicatorBar.classList.remove('completed')
    }
}

function calculateFontSize() {
    if (passwordLength > 43) {
        inputElement.classList.add('font-xxs')
        inputElement.classList.remove('font-xs')
        inputElement.classList.remove('font-sm')
    } else if (passwordLength > 32) {
        inputElement.classList.remove('font-xxs')
        inputElement.classList.add('font-xs')
        inputElement.classList.remove('font-sm')
    } else if (passwordLength > 22) {
        inputElement.classList.remove('font-xxs')
        inputElement.classList.remove('font-xs')
        inputElement.classList.add('font-sm')
    } else {
        inputElement.classList.remove('font-xxs')
        inputElement.classList.remove('font-xs')
        inputElement.classList.remove('font-sm')
    }
}

function copyToClipboard() {
    navigator.clipboard.writeText(inputElement.value)
}

function changeRange() {
    passwordLength = rangeElement.value
    spanElement.textContent = passwordLength
    generatePassword()  
}

upperCaseCheckElement.addEventListener('click', generatePassword)
numberCheckElement.addEventListener('click', generatePassword)
symbolCheckElement.addEventListener('click', generatePassword)
document.querySelector('#copyBtn').addEventListener('click', copyToClipboard)
document.querySelector('#copyIcon').addEventListener('click', copyToClipboard)
refreshBtn.addEventListener('click', generatePassword)
rangeElement.addEventListener('input', changeRange)

generatePassword()