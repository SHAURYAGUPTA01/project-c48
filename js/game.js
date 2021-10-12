class Game {
    constructor() {
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");
    }

    start() {
        player = new Player()
        player.getCount()

        form = new Form()
        form.display()

        player1 = createSprite(width / 2 - 400, height / 2)
        player1.addImage("player1", player1Img)
        player1.scale = 0.6

        player2 = createSprite(width / 2 + 400, height / 2)
        player2.addImage("player2", player2Img)

        players = [player1, player2]

        angle1 = 15
        badminton1 = Bodies.rectangle(player1.position.x + 20, player1.position.y - 70, 200, 100, { isStatic: true })
        World.add(world, badminton1)

        badminton2 = Bodies.rectangle(player2.position.x - 200, player2.position.y - 70, 200, 100, { isStatic: true })
        World.add(world, badminton2)

    }

    getState() {
        database.ref("gameState").on("value", (data) => {
            gameState = data.val();
        })
    }

    handleElements() {
        form.hide()
        //form.img.hide()
        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 200, 0);
        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 230, 50);
    }

    play() {
        this.handleElements()
        Player.getPlayersInfo()
        if (allPlayers !== undefined) {
            drawSprites()
            var index = 0
            for (var plr in allPlayers) {
                index += 1
                var x = allPlayers[plr].positionX
                var y = allPlayers[plr].positionY
                players[index - 1].position.x = x
                players[index - 1].position.y = y
            }
            push()
            translate(player1.position.x + 20, player1.position.y - 70)
            rotate(badminton1.angle)
            image(badminton1Img, 0, 0, 200, 100)
            pop()
            push()
            translate(player2.position.x - 200, player2.position.y - 70)
            rotate(badminton2.angle)
            image(badminton2Img, 0, 0, 200, 100)
            pop()
            if (keyIsDown(83)) {
                Matter.Body.setStatic(shuttle.body, false)
                Matter.Body.applyForce(shuttle.body, { x: 10, y: 500 }, { x: 5, y: 200})
            }
        }
        shuttle.display();
        this.handleBadmintonControls()
        this.handleResetButton()
        this.handlePlayerControls();
    }

    handleResetButton() {
        this.resetButton.mousePressed(() => {
            database.ref("/").set({
                gameState: 0,
                playerCount: 0,
                players: {}
            })
            window.location.reload()
        })
    }


    updateState(state) {
        database.ref("/").update({
            gameState: state
        })
    }

    handlePlayerControls() {
        if (keyIsDown(LEFT_ARROW) && player.positionX > 0) {
            player.positionX -= 5
            player.updateAll()
        }
        if (keyIsDown(RIGHT_ARROW)) {
            player.positionX += 5
            player.updateAll()
        }
        if (keyIsDown(UP_ARROW) && player.positionY > 300) {
            player.positionY -= 5
            player.updateAll()
        }
        if (keyIsDown(DOWN_ARROW) && player.positionY < 400) {
            player.positionY += 5
            player.updateAll()
        }
    }

    handleBadmintonControls() {
        console.log(angle1)
        if (keyIsDown(85) && badminton1.angle < 70) {
            console.log("test")
            Matter.Body.setStatic(badminton1, false)
            badminton1.angle += 0.05;
        }
        if (keyIsDown(68) && badminton2.angle > -30) {
            Matter.Body.setStatic(badminton2, false)
            badminton2.angle -= 0.05;
        }

    }
}