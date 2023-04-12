/*https://youtu.be/rTVoyWu8r6g?t=3518*/
/*THE TUTORIAL*/


/*https://www.youtube.com/watch?v=yP5DKzriqXA&t=285s*/
/*pokemon tutorial*/

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const scaledCanvas = {
	width: canvas.width/4,
	height: canvas.height/4,
}

const gravity = 0.5

class Sprite {
	constructor({position, imageSrc}) {
		this.position = position
		this.image = new Image()
		this.image.src = imageSrc 
	}

	draw() {
		if (!this.image) return 
		context.drawImage(this.image, this.position.x, this.position.y)
	}

	update() {
		this.draw()
	}
}


class Player {
	constructor(position) {
		this.position = position
		this.velocity = {x:0,y:1}
		this.height = 100
	}

	draw() {
		context.fillStyle = 'red'
		context.fillRect(this.position.x, this.position.y, 100, this.height)
	}

	update() {
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
		if ((this.position.y + this.height + this.velocity.y) < canvas.height)
			this.velocity.y += gravity
		else this.velocity.y = 0
	}
}

const player = new Player({x:0,y:0})
const player2 = new Player({x:330,y:330})


const keys = {
	d: {pressed: false,},
	a: {pressed: false,},
	w: {pressed: false,},
}


const background = new Sprite({
	position: {
		x:0,
		y:0,
	},
	imageSrc: './img/background.png'
})

function animate() {
	window.requestAnimationFrame(animate)
	context.fillStyle = 'white'
	context.fillRect(0, 0, canvas.width, canvas.height)
	
	context.save()
	context.scale(4, 4)
	context.translate(0, -background.image.height + scaledCanvas.height)
	background.update()
	context.restore()

	player.update()
	player2.update()

	player.velocity.x = 0
	if (keys.d.pressed) player.velocity.x = 1
	else if (keys.a.pressed) player.velocity.x = -1


/*	console.log('go')*/
}

animate()


window.addEventListener('keydown', (event) => {
	switch (event.key) {
		case 'd':
			keys.d.pressed = true 
			player.velocity.x = 1
		break
		case 'a':
			keys.a.pressed = true 
			player.velocity.x = -1
		break
		case 'w':
			keys.w.pressed = true 
			player.velocity.y = -5
		break
	}
	console.log(event)

})

window.addEventListener('keyup', (event) => {
	switch (event.key) {
		case 'd':
			keys.d.pressed = false 
			player.velocity.x = 1
		break
		case 'a':
			keys.a.pressed = false
			player.velocity.x = -1
		break
	}
	console.log(event)

})
/*context.fillStyle = 'white'
context.fillRect(0,0, canvas.width, canvas.height)*/