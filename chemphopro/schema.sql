DROP INDEX IF EXISTS  fold_change_kinase_name;

DROP TABLE IF EXISTS kinase;
DROP TABLE IF EXISTS fold_change;

CREATE TABLE kinase (
    `name` TEXT NOT NULL, -- name designated  reserved word in SQL so backticks acts as quoted identifyer 
    gene_name TEXT NOT NULL,
    gene_name TEXT NOT NULL,
    accession TEXT NOT NULL,
    protein_fullname TEXT NOT NULL,
    family TEXT
);

CREATE TABLE fold_change (
    kinase_name TEXT NOT NULL,
    phosphosite TEXT NOT NULL,
    treatment TEXT NOT NULL,
    fold_change REAL NOT NULL
);

CREATE INDEX fold_change_kinase_name ON fold_change(kinase_name);
