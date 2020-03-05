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
        // console.log(boards);
        let title = document.querySelector('#titleOne');
        title.innerHTML = boards[0][0]['title'];
        let boardsContainer = document.querySelector('.board-container');
        let boardList = '';
        let boards_length = boards.length;
        let fullBoard = document.querySelector('.board');
        for (let item = 1; item < boards.length; item++) {
            // for (let item = 0; item < boards_length; item++) {
            let cln = fullBoard.cloneNode(false);
            cln.id = item + 1;
            boardsContainer.appendChild(cln);
            let clnPlace = document.getElementById(cln.id);
            boardList=`
             <div class="board-header"><span class="board-title"><textarea class="Border_textarea" id="titleOne" >${boards[0][0]['title']}
            </textarea></span>
                <button class="board-add">Add Card</button>
                <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
            </div>
            <div class="board-columns">
                <div class="board-column" data-status="">
                    <div class="board-column-title">New</div>
                    <div class="board-column-content" id="new${item+1}" ondrop="drop(event)" ondragover="allowDrop(event)">
                    </div>
                </div>
                <div class="board-column" data-status="">
                    <div class="board-column-title">In Progress</div>
                    <div class="board-column-content" id="in progress${item+1}" ondrop="drop(event)" ondragover="allowDrop(event)">
                    </div>
                </div>
                <div class="board-column" data-status="">
                    <div class="board-column-title">Testing</div>
                    <div class="board-column-content" id="testing${item+1}" ondrop="drop(event)" ondragover="allowDrop(event)">
                    </div>
                </div>
                <div class="board-column" data-status="">
                    <div class="board-column-title">Done</div>
                    <div class="board-column-content" id="done${item+1}" ondrop="drop(event)" ondragover="allowDrop(event)">
                    </div>
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
                    dom.showCards(cards,statuses);
                    counter++;
                })
            }
        });
    },
    showCards: function (cards,statuses) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let cards_place = document.querySelectorAll('.board-column-content');
        for(let card of cards) {
            let cica = statuses[card.board_id].title;
            let kutya = card.status_id;
            let card_place = document.getElementById(statuses[card.status_id].title+card.board_id);
                          let cardToImport = `
                        <div class="card" draggable="true" ondragstart="drag(event)">
                        <div class="card-remove" id="${card.id}"><img src="/static/bin.png" alt="Bin" width="20"></div>
                        <div> <span class="card-title" ><textarea placeholder= "${card.title}" {color:#FFFFFF} class="Card_textarea" ></textarea> </span> </div>
                        </div>
                        `;
            card_place.insertAdjacentHTML('beforeend',cardToImport);

        }

        let btn = document.querySelectorAll('.board-add');
        for (let addCard=0; addCard < btn.length; addCard++) {
        btn[addCard].addEventListener('click', (ev)=>{
            let boardNum = addCard + 1;
            dataHandler.createNewCard('added card', boardNum, 0, function (boardID) {
                dom.doNothing();
            });
        });
        }

        let txtarea = document.querySelectorAll('.textarea');
        for (let index=0; index < txtarea.length; index++) {
            txtarea[index].addEventListener('blur', (ev)=>{
                let boardNum2 = index + 1;
                let new_title = ev.target.value;
                dataHandler.changeBoardTitle(boardNum2, new_title, function () {
                    dom.doNothing();
                })
            })
        }
        let deleteButton = document.querySelectorAll('.card-remove');
        for (let index2=0; index2 < deleteButton.length; index2++) {
            deleteButton[index2].addEventListener('click', (ev) => {
                console.log(deleteButton[index2]);
                let cardNum = deleteButton[index2].id;
                console.log(cardNum);
                dataHandler.deleteCard(cardNum, function () {
                    dom.doNothing();
                });
            })
        }

    },
    doNothing: function () {
        window.location.reload()
    }
    // here comes more features
};
