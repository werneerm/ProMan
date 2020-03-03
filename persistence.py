import csv

from psycopg2._psycopg import cursor

import connection
from psycopg2 import sql

STATUSES_FILE = './data/statuses.csv'
BOARDS_FILE = './data/boards.csv'
CARDS_FILE = './data/cards.csv'

_cache = {}  # We store cached data in this dict to avoid multiple file readings


def _read_csv(file_name):
    """
    Reads content of a .csv file
    :param file_name: relative path to data file
    :return: OrderedDict
    """
    with open(file_name) as boards:
        rows = csv.DictReader(boards, delimiter=',', quotechar='"')
        formatted_data = []
        for row in rows:
            formatted_data.append(dict(row))
        return formatted_data


def _get_data(data_type, file, force):
    """
    Reads defined type of data from file or cache
    :param data_type: key where the data is stored in cache
    :param file: relative path to data file
    :param force: if set to True, cache will be ignored
    :return: OrderedDict
    """
    if force or data_type not in _cache:
        _cache[data_type] = _read_csv(file)
    return _cache[data_type]


def clear_cache():
    for k in list(_cache.keys()):
        _cache.pop(k)


# @connection.connection_handler
# def get_statuses(cursor, id):
#     cursor.execute("""
#                 SELECT * FROM statuses
#                 WHERE   statuses.id = %(id)s
#     """, {'id':id})
#
#     statuses = cursor.fetchall()
#     return statuses


# def get_boards(force=False):
#     return _get_data('boards', BOARDS_FILE, force)


@connection.connection_handler
def get_boards(cursor, force=False):
    cursor.execute("""
                    SELECT * FROM boards
                    ORDER BY id;
                   """,
                   )
    boards = cursor.fetchall()
    return boards, force

@connection.connection_handler
def get_cards_SQL(cursor, board_id):
    cursor.execute("""
    SELECT * FROM cards
    WHERE board_id=%(board_id)s
    ORDER BY id;
    """, {'board_id': board_id})
    cards = cursor.fetchall()
    return cards

def get_cards(force=False):
    return _get_data('cards', CARDS_FILE, force)
