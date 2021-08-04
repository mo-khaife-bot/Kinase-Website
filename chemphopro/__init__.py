import os

from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from chemphopro import bioservices
from chemphopro import db

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'chemphopro.sqlite'),
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # register the databse with the Application. 
    # This will initialize the database connection 
    # and release all database resources when the application is stopping
    db.init_app(app)

    # App info 
    @app.route('/info')
    def info():
        # Use the jsonify to return a JSON response  
        return jsonify({'name': 'ChemPhoPro', 'version': 'dev'})

    @app.route('/knownkinases/<string:accession>')
    @cross_origin()
    def omnipath(accession):
        result = bioservices.omnipath(accession)
        return jsonify(result)

    @app.route('/kinase/search/<string:name>')
    @cross_origin()
    def uniprot_kinase_search(name):
        kinase = bioservices.uniprot_kinase_search(name)
        return jsonify(kinase)

    @app.route('/kinase/<string:name>')
    @cross_origin()
    def find_uniprot_kinase_by_name(name):
        kinase = bioservices.find_uniprot_kinase_by_name(name)
        return jsonify(kinase)

    @app.route('/kinase/<string:name>/foldchange')
    @cross_origin()
    def kinase_fold_change_search(name):
        kinase_fold_change = bioservices.kinase_fold_change_search(name)
        return jsonify(kinase_fold_change)

    return app
