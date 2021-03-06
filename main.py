from flask import Flask, render_template, url_for, request
from util import json_response

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board_from_SQL(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))



@app.route("/get-status/<int:status_id>")
@json_response
def get_status_for_card(status_id: int):
    return data_handler.get_card_status(status_id)


@app.route('/statuses')
@json_response
def get_all_status():
    return data_handler.get_statuses()

@app.route('/createNewCard', methods = ['POST'])
def createNewCard():
    json_body = request.json
    data_handler.createNewCard(json_body['title'], json_body['boardID'], json_body['statusID'])
    return 'allright'

@app.route('/changeBoardTitle', methods = ['POST'])
def changeBoardTitle():
    json_body = request.json
    data_handler.changeBoardTitle(json_body['id'], json_body['title'])
    return 'allright'


@app.route('/deleteCard', methods = ['POST'])
def deleteCard():
    json_body = request.json
    data_handler.deleteCard(json_body['id'])
    return 'allright'


@app.route('/changeCard', methods = ['POST'])
def changeCard():
    json_body = request.json
    data_handler.changeCard(json_body['id'], json_body['title'])
    return "goodvibes"

@app.route('/dragndrop',methods=['POST'])
def dragula():
    json_body = request.json
    print("szia Mark meg kell nyugodni :)")
    data_handler.change_card_status(json_body['cardId'],json_body['statusId'], int(json_body['boardId']))
    return "asd"

if __name__ == '__main__':
    app.run()