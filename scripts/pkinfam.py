import sys
import re
import requests
from xml.etree import ElementTree as ET

# print the header
print("name\tgene_name\taccession\tprotein_fullname\tfamily")

for line in sys.stdin:
    # match the accession, the human part and the mouse part 
    match = re.match(r"^([0-9A-Za-z-]+)*\s+(\w+_HUMAN\s+\(\w+\s*\))*\s+(\w+_MOUSE\s+\(\w+\s*\))*", line)
    # assign match groups for further processing
    kinase_name = match.group(1)
    human = match.group(2)
    mouse = match.group(3)

    # capture human gene name and acession if they exist
    if human:
        human_match = re.match(r"(\w+_HUMAN)\s+\((\w+)\s*\)", human)
        human_gene = human_match.group(1).strip()
        human_accession = human_match.group(2).strip()
    # capture mouse gene name and acession if they exist
    if mouse:
        mouse_match = re.match(r"(\w+_MOUSE)\s+\((\w+)\s*\)", mouse)
        mouse_gene = mouse_match.group(1).strip()
        mouse_accession = mouse_match.group(2).strip()

    if human_accession:
        # construct a uniprot request URL 
        request_url = f'https://www.uniprot.org/uniprot/{human_accession}.xml'
        # call the API
        r = requests.get(request_url)
        # process xml response 
        root = ET.fromstring(r.text)
        # find the recommended name Element
        recommended_name = root.find(".//{http://uniprot.org/uniprot}protein/{*}recommendedName")
        # get the text value of the fullName element
        fullname_text = recommended_name.find("{*}fullName").text
        # find the short name
        shortname = recommended_name.find("{*}shortName")
        # get the shortname text if it exists
        shortname_text = f" ({shortname.text}) " if shortname is not None else ""
        # find all EC numbers
        ec_numbers = recommended_name.findall("{*}ecNumber")
        # format each entry
        ec_numbers_formatted = []
        for ec_number in ec_numbers:
            ec_numbers_formatted.push(f'(EC {ec_number.text})')
        # join all 
        ec_numbers_text = " ".join(ec_numbers_formatted)

        fullname_web_text = f"{fullname_text}{shortname_text}{ec_numbers_text}"

        # find the family entry
        family = root.find(".//{http://uniprot.org/uniprot}entry/{*}comment[@type='similarity']/{*}text")
        family_text = family.text if family is not None else None

        print(f'{kinase_name}\t{human_gene}\t{human_accession}\t{fullname_web_text}\t{family_text}')
