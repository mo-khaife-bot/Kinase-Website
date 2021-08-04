import sqlite3

import click
from flask import current_app, g
from flask.cli import with_appcontext


def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    return g.db


def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db():
    db = get_db()
    # reads the db schema and executes the SQL commands on the database connection
    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))
    load_data()

def load_data():
    import csv, sqlite3

    db = get_db()
    cur = db.cursor()

    with open('data/kinases.tsv','r') as fin:
        # csv.DictReader uses first line in file for column headings by default
        dr = csv.DictReader(fin, delimiter = '\t') # comma is default delimiter
        to_db = [(i['name'], i['gene_name'], i['accession'], i['protein_fullname'], i['family']) for i in dr]

    # insert all entries into the database
    cur.executemany("INSERT INTO kinase (name, gene_name, accession, protein_fullname, family) VALUES (?, ?, ?, ?, ?);", to_db)
    db.commit()
    
    with open('data/foldchange.tsv','r') as fin:
        # csv.DictReader uses first line in file for column headings by default
        fold_changes = csv.DictReader(fin, delimiter = '\t') # comma is default delimiter
        fold_changes_to_db = [(i['kinase_name'], i['phosphosite'], i['treatment'], i['fold_change']) for i in fold_changes]

    # insert all entries into the database
    cur.executemany("INSERT INTO fold_change (kinase_name, phosphosite, treatment, fold_change) VALUES (?, ?, ?, ?);", fold_changes_to_db)
    db.commit()
    
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    init_db()
    click.echo('Initialized the database.')
