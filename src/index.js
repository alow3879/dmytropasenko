import './styles/main.scss'
import './styles/bootstrap-grid.css'

document.querySelector('div').remove()

const application = document.querySelector('body')
const menuHead = document.querySelector('.menu-head')
const networks = document.querySelector('.networks')
const scroll = document.querySelector('.scroll')
const navLinksAll = document.querySelectorAll('.nav-link')
const workSlider = document.querySelector('.works-slider')
const menuBtn = document.querySelector('.menu-btn')
const closeMenuBtn = document.querySelector('.close-menu-btn')
const mobileNavigation = document.querySelector('.mobile-navigation')
const workLinkAll = document.querySelectorAll('.work-link')
const modalWindowWork = document.querySelector('.modal-window-work')
const closeModal = document.querySelector('.close-modal')

let counter = 0
let sliderCounter = 0
let coordinateTouchStart = 0
let coordinateTouchEnd = 0

window.onload = function () {
	document.location.href='#'
}

window.addEventListener('wheel', scrollWindow)

window.addEventListener('touchstart', swipeStart, false)

window.addEventListener('touchend', swipeEnd, false)



for (let item of workLinkAll) {
	item.addEventListener('click', (e) => {
		modalWindowWork.children[0].innerHTML = `<img src="images/works/${e.target.alt}.jpg" alt="${e.target.alt}" class="work-img">`
		window.removeEventListener('wheel', scrollWindow)
		window.removeEventListener('touchstart', swipeStart, false)
		window.removeEventListener('touchend', swipeEnd, false)
		modalWindowWork.style.display = 'block'
		document.querySelector('.portfolio').style.zIndex = 0
	})
}


closeModal.addEventListener('click', () => {
	window.addEventListener('wheel', scrollWindow)
	window.addEventListener('touchstart', swipeStart, false)
	window.addEventListener('touchend', swipeEnd, false)
	modalWindowWork.style.display = 'none'
	document.querySelector('.portfolio').style.zIndex = -1
})

menuBtn.addEventListener('click', function() {
	document.querySelector('.mobile-navigation').classList.toggle('mobile-navigation__active')
})

closeMenuBtn.addEventListener('click', function() {
	document.querySelector('.mobile-navigation').classList.toggle('mobile-navigation__active')
})

scroll.addEventListener('click', () => {
	counter !== 3 ? counter += 1 : counter = 0
	counter = Math.floor(counter)
	move(counter)
})

function scrollWindow(e) {
	if (e.deltaY > 0 && counter < 3) {
		counter += 0.5
		if(Number.isInteger(counter)) {
			move(counter)
		}
	} else if (e.deltaY < 0 && counter > 0) {
		counter -= 0.5
		if(Number.isInteger(counter)) {
			move(counter)
		}
	}
}

function swipeStart(e) {
	coordinateTouchStart = e.touches[0].clientY
}

function swipeEnd(e) {
	coordinateTouchEnd = e.changedTouches[0].clientY
	
	let int = coordinateTouchStart - coordinateTouchEnd

	if (int > 0 && counter < 3 && Math.abs(int) > 50) {
		counter += 1
		if(Number.isInteger(counter)) {
			move(counter)
		}
	} else if (int < 0 && counter > 0 && Math.abs(int) > 50) {
		counter -= 1
		if(Number.isInteger(counter)) {
			move(counter)
		}
	}
}

function move(counter) {

	if(counter == 3) {
		scroll.innerHTML = `Go to top <span class="scroll-arrow"></span>`
		scroll.style.transform = `translateX(-15px) translateY(${counter * 100}vh) rotate(-90deg)`
	} else if(counter !== 3) {
		scroll.innerHTML = `scroll down <span class="scroll-arrow"></span>`
		scroll.style.transform = `translateY(${counter * 100}vh) rotate(90deg)`
	}

	toggleNavLinkActive(counter)

	application.style.transform = `translateY(-${counter * 100}vh)`
	menuHead.style.transform = `translateY(${counter * 100}vh)`
	networks.style.transform = `translateY(${counter * 100}vh)`
	mobileNavigation.style.transform = `translateY(${counter * 100}vh)`
	application.style.transition = '.3s ease'
	menuHead.style.transition = '.3s ease'
	networks.style.transition = '.3s ease'
	scroll.style.transition = '.3s ease'
	mobileNavigation.style.transition = '.3s ease'
}

function toggleNavLinkActive(counter) {
	if(counter > 0) {
		if (document.querySelector('.nav-link__active')){
			document.querySelector('.nav-link__active').classList.remove('nav-link__active')
		}
		navLinksAll[counter-1].classList.add('nav-link__active')
	}

	if (counter < 1 && document.querySelector('.nav-link__active')) {
		document.querySelector('.nav-link__active').classList.remove('nav-link__active')
	}
}

for(let item of navLinksAll) {
	let itemAttributeValue = item.attributes[0].value
	item.addEventListener('click', () => {
		if ( item.attributes[0].value.toString() == "#about-me") {
			listByClickLink(1)
		} else if (item.attributes[0].value.toString() == "#portfolio") {
			listByClickLink(2)
		} else if (item.attributes[0].value.toString() == "#contacts") {
			listByClickLink(3)
		}
		document.querySelector('.mobile-navigation').classList.toggle('mobile-navigation__active')
	})
}

function listByClickLink(num) {
	counter = num
	move(counter)
}

workSlider.previousElementSibling.addEventListener('click', () => {
	if (sliderCounter > 0) {
		sliderCounter--
		console.log(sliderCounter)
		workSlider.children[0].style.transform = `translateY(-${sliderCounter * 15}vh)`
	}
})

workSlider.nextElementSibling.addEventListener('click', () => {
	if (sliderCounter < 2) {
		sliderCounter++
		console.log(sliderCounter)
		workSlider.children[0].style.transform = `translateY(-${sliderCounter * 15}vh)`
	}
})

