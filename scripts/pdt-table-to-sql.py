import sys
import math

table_input = sys.argv[1]

# print the header
print("kinase_name\tphosphosite\ttreatment\tfold_change")

# open the file
with open(table_input, 'r') as input_reader:
    # read the header and remove trailing charachters. 
    # this will make the header smaller by 1 column compared to the following rows
    header = input_reader.readline().strip().split("\t")
    # select indices to keep 
    kinase_sites_selection = []
    # iterate with index over the header, as the 
    for idx, site in enumerate(header):
        if "(M" in site or "(None" in site:
            continue
        else:
            kinase_sites_selection.append(idx)

    # iterate over the 
    for line in input_reader:
        # treatment name is at [0], followed bvy fold changes
        fold_changes = line.strip().split("\t")
        # ietrate over the previously selected kinase indices
        for idx in kinase_sites_selection:
            # get kinase site name 
            kinase = header[idx]
            # get treatment name
            treatment = fold_changes[0]
            # get the fold change, pad by one as the indices are relative to the header
            fold_change = fold_changes[idx + 1]
            # print out if not empty 
            if not (fold_change == "" or fold_change == 'inf'):
                # separate the name of the kinase form the site
                kinase_name, site = kinase.split("(")
                # clean up the closing brace
                site = site.replace(")", "")
                # export
                print(f'{kinase_name}\t{site}\t{treatment}\t{fold_change}')
