// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let board_container = document.querySelector('.board-container')
        let first_board = `<section class="board" id="1">
            <div class="board-header"><span class="board-title"><textarea class="Border_textarea" id="titleOne">${boards[0][0]['title']}
            </textarea></span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle" id="1"><i class="fa fa-chevron-down"></i></button>
            </div>
            <div class="board-columns" id="hide1">
                <div class="board-column">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content" id="new1"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">In Progress</div>
                    <div class="board-column-content" id="in progress1"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content" id="testing1"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content" id="done1"></div>
                </div>
            </div>
        </section>`
        board_container.insertAdjacentHTML("beforeend", first_board)
        let boardList = '';
        // let boards_length = boards.length;
        let fullBoard = document.querySelector('.board');
        for (let item = 1; item < boards.length; item++) {
            // for (let item = 0; item < boards_length; item++) {
            let cln = fullBoard.cloneNode(false);
            cln.id = item + 1;
            board_container.appendChild(cln);
            let clnPlace = document.getElementById(cln.id);
            boardList=`
             <div class="board-header"><span class="board-title"><textarea class="Border_textarea" id="titleOne" >${boards[0][1]['title']}
            </textarea></span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle" id="2"><i class="fa fa-chevron-down"></i></button>
            </div>
            <div class="board-columns" id="hide2">
                <div class="board-column">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content" id="new${item+1}"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">In Progress</div>
                    <div class="board-column-content" id="in progress${item+1}"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content" id="testing${item+1}"></div>
                </div>
                <div class="board-column">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content" id="done${item+1}"></div>
                </div>
            </div>
            `;
            clnPlace.insertAdjacentHTML("beforeend",boardList);

            dom.loadStatus();
        }

    },
    loadStatus: function () {
        dataHandler.getStatuses(function (statuses) {
            dom.showStatus(statuses);
        })
    },
    showStatus: function (statuses) {
        dom.loadCards(statuses);
    },
    loadCards: function (statuses) {
        // retrieves cards and makes showCards called
        dataHandler.getBoards(function (boards) {
            let counter = 0;
            for (let board of boards) {
                dataHandler.getCardsByBoardId(board[counter].id, function (cards) {
                    counter++;
                    dom.showCards(cards,statuses);

                })
            }
        });
    },
    showCards: function (cards,statuses) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let cards_place = document.querySelectorAll('.board-column-content');
        for (let card of cards) {
            let cica = statuses[card.board_id].title;
            let kutya = card.status_id;
            let card_place = document.getElementById(statuses[card.status_id].title + card.board_id);
            let cardToImport = `
                        <div class="card" draggable="true" id="${card.id}">
                        <div class="card-remove" id="${card.id}"><img src="/static/bin.png" alt="Bin" width="20"></div>
                        <div> <span class="card-title"><textarea placeholder="${card.title}" id="${card.id}" {color:#FFFFFF} class="Card_textarea"></textarea></span></div>
                        </div>
                        `;
            card_place.insertAdjacentHTML('beforeend', cardToImport);

        }

        let btn = document.querySelectorAll('.board-add');
        for (let addCard = 0; addCard < btn.length; addCard++) {
            btn[addCard].addEventListener('click', (ev) => {
                let boardNum = addCard + 1;
                dataHandler.createNewCard('added card', boardNum, 0, function (boardID) {
                    dom.doNothing();
                });
            });
        }

        let txtarea = document.querySelectorAll('.Border_textarea');
        for (let index = 0; index < txtarea.length; index++) {
            txtarea[index].addEventListener('blur', (ev) => {
                let boardNum2 = index + 1;
                let new_title = ev.target.value;
                dataHandler.changeBoardTitle(boardNum2, new_title, function () {
                    dom.doNothing();
                })
            })
        }
        let deleteButton = document.querySelectorAll('.card-remove');
        for (let index2 = 0; index2 < deleteButton.length; index2++) {
            deleteButton[index2].addEventListener('click', (ev) => {
                console.log(deleteButton[index2]);
                let cardNum = deleteButton[index2].id;
                console.log(cardNum);
                dataHandler.deleteCard(cardNum, function () {
                    dom.doNothing();
                });
            })
        }
        let cardTxtarea = document.querySelectorAll('.Card_textarea');
        for (let cardTxtNum = 0; cardTxtNum < cardTxtarea.length; cardTxtNum++) {
            cardTxtarea[cardTxtNum].addEventListener('blur', (ev) => {
                let cardIndex = cardTxtarea[cardTxtNum].id;
                let newTitle = ev.target.value;
                dataHandler.changeCard(cardIndex, newTitle, function () {
                    dom.doNothing();
                })
            })
        }
        let toggleBtn = document.querySelectorAll('.board-toggle');
        for (let btnNum=0; btnNum < toggleBtn.length; btnNum++) {
            toggleBtn[btnNum].addEventListener('click', (ev) => {
                if (btnNum == 0) {
                    let boardToHide = document.getElementById("hide1")
                    if (boardToHide.style.display === 'none') {
                    boardToHide.style.display = 'flex'
                } else {
                    boardToHide.style.display = 'none'
                }
                }
                else if (btnNum == 1) {
                    let boardToHide = document.getElementById("hide2")
                    if (boardToHide.style.display === 'none') {
                        boardToHide.style.display = 'flex'
                    } else {
                        boardToHide.style.display = 'none'
                    }
                }
            })
        }

        function allowDrop (event) {
            event.preventDefault();
        }
        let columnsContents = document.querySelectorAll('.board-column-content');
        let cardsToDrag = document.querySelectorAll('.card');
        for (let num=0; num < cardsToDrag.length; num++) {
            cardsToDrag[num].addEventListener('dragstart', (event) => {
                event.dataTransfer.setData("text", event.target.id);
            });
            columnsContents[num].addEventListener('dragover', (event) =>{
                allowDrop(event)
            });
            columnsContents[num].addEventListener('drop', (event) =>{
                let fos = event.dataTransfer.getData("text");
                event.target.appendChild(document.getElementById(fos));
                let boardColumnContent = event.target.id;
                let cardId = fos ;
                let boardId = boardColumnContent.slice(-1);
                let statusId = boardColumnContent.slice(0, -1);
                dataHandler.dragAndDrop(cardId,statusId,boardId,function (){dom.doNothing()})
            })
        }

    },
    doNothing: function () {
        // window.location.reload()
    },
    // here comes more features
};
