import requests
from chemphopro.db import get_db
import pandas as pd

# Call the omnipath api to get the known kinase targets for the given kinase accession
def omnipath(accession):
    # construct the request URL 
    requestUrl = 'https://omnipathdb.org/enz_sub?genesymbols=1&fields=sources,references,isoforms&enzymes=' + accession
    # call the API
    r = requests.get(requestUrl)
    # convert to pandas df
    data = pd.read_csv(requestUrl)
    # separate values into respective colms split by '\t'
    d1 = data['enzyme\tsubstrate\tenzyme_genesymbol\tsubstrate_genesymbol\tresidue_type\tresidue_offset\tmodification\tsources\treferences\tisoforms'].str.split('\t', expand=True)
    # give colm respective names split by '\t'
    d1.columns="enzyme\tsubstrate\tenzyme_genesymbol\tsubstrate_genesymbol\tresidue_type\tresidue_offset\tmodification\tsources\treferences\tisoforms".split('\t')
    # Return the text of the response as a list of records
    return d1.to_dict(orient="records")

# Search the local uniprot kinase database 
def uniprot_kinase_search(name):
    # get a db connection
    db = get_db()
    # Search for a Kinase name and using a wildcard
    result_set = db.execute(
            'SELECT * FROM kinase WHERE `name` LIKE ?', ("%"+name+"%",)
        ).fetchall()
    # create an emppty kinase list
    kinases = []
    # iterarte over the fetched records
    for record in result_set:
        # transform the records into a dict
        kinase = {'name': record["name"], 'gene_name': record["gene_name"], 'accession': record["accession"], 'protein_fullname': record["protein_fullname"], 'family': record["family"]}
        # add the kinase to the list of kinases
        kinases.append(kinase)
    # return the matched kinases
    return kinases

# Search the local uniprot kinase database 
def find_uniprot_kinase_by_name(name):
    # get a db connection
    db = get_db()
    # Search for a Kinase name and using a wildcard
    record = db.execute(
            'SELECT * FROM kinase WHERE `name` = ?', (name,)
        ).fetchone()

    # transform the records into a dict
    kinase = {'name': record["name"], 'gene_name': record["gene_name"], 'accession': record["accession"], 'protein_fullname': record["protein_fullname"], 'family': record["family"]}
    # add the kinase to the list of kinases
    # return the matched kinases
    return kinase

# Search the fold change database for value of the query kinase 
def kinase_fold_change_search(name):
    # get a db connection
    db = get_db()
    # Search for a Kinase by name
    result_set = db.execute(
        #partial matching using wild cards for values with 3 characters
            'SELECT * FROM fold_change WHERE kinase_name = ?', (name,)
        ).fetchall()
    kinase_fold_change = {}
    if result_set is not None:
        # Transform the result into dict
        for record in result_set:
            # if phosphosite already observed then append to the array
            if record["phosphosite"] in kinase_fold_change:
                kinase_fold_change[record["phosphosite"]].append({'treatment': record["treatment"], 'fold_change': record["fold_change"]})
            # create an array for the entries of this phosphosite
            else:
                kinase_fold_change[record["phosphosite"]] = [{'treatment': record["treatment"], 'fold_change': record["fold_change"]}]

    # return the matched kinase phosphosite foldchange by treatment
    return kinase_fold_change
