function renderHtml(player1,player2) {
    let contentBody = `<div class="box"><div class="game-box"> 
    <div class="box-player" id="box-player1">
    <div class="name">
        <h2>${player1}</h2>
    </div>
    <div class="box-moves" id="box-moves1">
        <img class="img-moves" src="imgs/exis.svg" alt="x">
        <img class="img-moves" src="imgs/exis.svg" alt="x">
        <img class="img-moves" src="imgs/exis.svg" alt="x">
        <img class="img-moves" src="imgs/exis.svg" alt="x">
        <img class="img-moves" src="imgs/exis.svg" alt="x"></div>
    </div>
    <div class="gameboard"></div>
    <div class="box-player" id="box-player2">
        <div class="name">
            <h2>${player2}</h2>
        </div>
        <div class="box-moves" id="box-moves2">
            <img class="img-moves" src="imgs/circle.svg" alt="x">
            <img class="img-moves" src="imgs/circle.svg" alt="x">
            <img class="img-moves" src="imgs/circle.svg" alt="x">
            <img class="img-moves" src="imgs/circle.svg" alt="x">
            <img class="img-moves" src="imgs/circle.svg" alt="x">
                   
        </div>
    </div></div>`
    document.querySelector("body").innerHTML = contentBody
}


const Gameboard = (() => {
    let gameboard = ["","","","","","","","",""]
    
    const renderGameboard = (players) => {
        let contentSquare = ""

        gameboard.forEach((square,index) => {
            if (square == "X") {
            contentSquare += `<div class="square" id="square-${index}"><img class="img-moves" src="imgs/exis.svg" alt="x"></div>`

            }else if (square == "O") {
            contentSquare += `<div class="square" id="square-${index}"><img class="img-moves" src="imgs/circle.svg" alt="x"></div>`
                
            }else{
            contentSquare += `<div class="square" id="square-${index}"> ${square}</div>`
            }
        });

        document.querySelector(".gameboard").innerHTML = contentSquare
        if (Game.checkWinner(gameboard)){
            if (Game.getCurrentPlayer() == 1){
                const boxMove1 = document.querySelector("#box-moves1")  
                const boxMove2 = document.querySelector("#box-moves2")   

                const trophy = document.createElement("img")
                const over = document.createElement("img")
                trophy.src = "gifs/win.gif" 
                over.src = "imgs/gameover.svg" 

                while (boxMove1.firstChild){
                    boxMove1.removeChild(boxMove1.firstChild)
                }
                while (boxMove2.firstChild){
                    boxMove2.removeChild(boxMove2.firstChild)
                }
                boxMove1.appendChild(trophy)
                boxMove2.appendChild(over)
             
            } else {
                const boxMove1 = document.querySelector("#box-moves1")  
                const boxMove2 = document.querySelector("#box-moves2")   

                const trophy = document.createElement("img")
                const over = document.createElement("img")
                trophy.src = "gifs/win.gif" 
                over.src = "imgs/gameover.svg" 

                while (boxMove1.firstChild){
                    boxMove1.removeChild(boxMove1.firstChild)
                }
                while (boxMove2.firstChild){
                    boxMove2.removeChild(boxMove2.firstChild)
                }
                boxMove2.appendChild(trophy)
                boxMove1.appendChild(over)
                
            }
            renderNewgame()
            return
        }
        if (Game.checkGameOver(gameboard)) {
            const boxmove1 = document.querySelector("#box-moves1")  
            const boxmove2 = document.querySelector("#box-moves2")   

            const tie1 = document.createElement("img")
            const tie2 = document.createElement("img")

            tie1.src = "imgs/tie.svg" 
            tie2.src = "imgs/tie.svg" 

        
            while (boxmove1.firstChild){
                boxmove1.removeChild(boxmove1.firstChild)
                    
            }
            while (boxmove2.firstChild){
                boxmove2.removeChild(boxmove2.firstChild)
                    
            }


            
            boxmove2.appendChild(tie1)

            boxmove1.appendChild(tie2)
                
            renderNewgame()
        }
        
        const squares = document.querySelectorAll(".square")

        squares.forEach(square => {
            square.addEventListener('click', (e)=>{
                update(parseInt(e.target.id.split('-')[1]))
            })
    
         });
    }

    const renderNewgame = () =>{
        const box = document.querySelector(".box")
        const divNewgame = document.createElement("div")
        const imgNewgame = document.createElement("img")
        divNewgame.classList.add("box-newgame")
        imgNewgame.classList.add("start-img")
        imgNewgame.src = "imgs/newgame.svg"
        divNewgame.appendChild(imgNewgame)
        imgNewgame.addEventListener("click", ()=>{
            window.location.reload();
    })
        box.appendChild(divNewgame)
        return
    }


    const update = (index) => {
        if (gameboard[index] == "") {
            gameboard[index] = Game.getPlayers()[Game.getCurrentPlayer()].symbol
            if (Game.getCurrentPlayer() == 1){
                const boxMove2 = document.querySelector("#box-moves2") 

                boxMove2.removeChild(boxMove2.firstElementChild)
            } else {
                const boxMove1 = document.querySelector("#box-moves1")  
                boxMove1.removeChild(boxMove1.firstElementChild)        
            }
            Game.changePlayer()
            renderGameboard()
        }
    }

    return{
        renderGameboard,
    }
})();

const Game = (() => {
    let players = []
    let currentPlayer
  
    
    const createPlayer = (name, symbol) =>{
        return{
            name,
            symbol
        }
    }

    const start = (player1, player2) => {
        players = [createPlayer(player1,"X"),
                    createPlayer(player2,"O")]
        gameOver = false
        winner = false
        currentPlayer = 0
        Gameboard.renderGameboard(players)
        
    
    }

    const changePlayer = () =>{
        currentPlayer =  currentPlayer === 0 ? 1 : 0
    }

    const checkGameOver = (gameboard) =>{
        let count = 0

        gameboard.forEach(space => {
            if (space != "") {
                count +=1
            }
        })

        if(count == 9){
            return true
        }  
    }

    const checkWinner = (position) => {
        let winner = false
        const combinationsWinner = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
        combinationsWinner.forEach(combination => {
            const [a, b, c] = combination;
            if (position[a] && position[a] == position[b]  && position[a] == position[c]) {
              winner = true
            } 

        });
        return winner
    }

    const getCurrentPlayer = () => currentPlayer;
    const getPlayers = () => players;

    return{
        start,
        changePlayer,
        getCurrentPlayer,
        getPlayers,
        checkGameOver,
        checkWinner
    }

})();




document.querySelector(".start-img").addEventListener("click", () =>{
    const body = document.querySelector("body")
  

    let player1 = document.querySelector("#player1").value
    let player2 = document.querySelector("#player2").value

    if (player1==="") player1 = "Player 1";
    if (player2==="") player2 = "Player 2";
    

    while (body.firstChild){
        body.removeChild(body.firstChild)
    }
    const gifVersus = document.createElement('img')
    gifVersus.src = 'gifs/vs.gif'
    gifVersus.setAttribute('style', 'height: 100dvh; width:100dvw')
    body.appendChild(gifVersus)
    setTimeout(() => {
        body.removeChild(body.firstChild)
        renderHtml(player1,player2)
        Game.start(player1,player2)
    }, 870);    
    
})


