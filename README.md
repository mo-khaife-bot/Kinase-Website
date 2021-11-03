# ChemPhoPro Kinase-Website prototype 
A prototype web-based software tool that allows users to explore background information about human protein kinases enzymes and the sites they phosphorylate.
This web based resource is ideally for researchers and students to utilise and search information about Kinases. This website must have low hardware requirements and can be utilised by biologists with minimal to no coding or command line experience.

# Background info about Kinases
Kinases are a group of enzymes that enable the transfer of a phosphate group from a high energy phosphate donating molecule (i.e ATP/adenosine triphosphate) to a substrate, then  ATP becoming ADP/Adenosine diphosphate. **This process is known as Phosphorylation.** The reverse process where ADP becomes ATP and now a de-phosphorylated substrate, is known as ‘dephosphorylation’. The substrate can be a protein, liquid, nucleic acids or carbohydrate. Kinases which phosphorylate protein substrates are the largest Kinase group and known as protein kinases.

![image](https://user-images.githubusercontent.com/59238194/140041805-c72ce54f-1369-4176-a6a6-5bda5238cdfd.png)

*(BellBrook Labs 2018)*

# Why are kinases important?
This process of phosphorylation (via Kinase enzyme) and it’s counterpart de-phosphorylation (via Phosphatase enzyme) enables the cell to regulate important physiological responses to both intracellular and extracellular signals.

Protein phosphorylation is found in all species and is crucial to a number of basic cellular processes such as; metabolism, growth, division, differentiation, motility, organelle trafficking, membrane transport, muscle contraction, immunity, learning and memory. Protein phosphor-regulation mechanisms are relevant to a number of biological functions and diseases meaning they are a key area for research!

# Features

The website will contain key information about kinases that biologists would be interested in:
- Name of Kinases
- Their respective inhibitors
- The proteins the Kinase act on
- Experimental Tissue samples that identify where Kinases act.

Utilised the PKINFAM (https://www.uniprot.org/docs/pkinfam) document from Uniprot website(Modi & Dunbrack, 2019). As this information is stored from uniport
   6
it is updated regularly. 

The website makes use of APIs to key databases that store important information about kinases
- Uniprot (the Universal Protein Resource) ( https://www.uniprot.org ) enables access to a number of protein database via the identifyer i.e UniProtKB accession number (AC).
- Omnipath (https://omnipathdb.org/) API  is connected to the UniProtKB/Swiss-Prot database and provides info about proteins and their interactions.

# Software Architexture 

     
