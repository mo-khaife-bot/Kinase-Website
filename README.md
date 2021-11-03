# ChemPhoPro Kinase-Website prototype 
A prototype web-based software tool that allows users to explore background information about human protein kinases enzymes and the sites they phosphorylate.
This web based resource is ideally for researchers and students to utilise and search information about Kinases. This website must have low hardware requirements and can be utilised by biologists with minimal to no coding or command line experience.

# Background info about Kinases
Kinases are a group of enzymes that enable the transfer of a phosphate group from a high energy phosphate donating molecule (i.e ATP/adenosine triphosphate) to a substrate, then  ATP becoming ADP/Adenosine diphosphate. **This process is known as Phosphorylation.** The reverse process where ADP becomes ATP and now a de-phosphorylated substrate, is known as ‘dephosphorylation’. The substrate can be a protein, liquid, nucleic acids or carbohydrate. Kinases which phosphorylate protein substrates are the largest Kinase group and known as protein kinases.

![image](https://user-images.githubusercontent.com/59238194/140041805-c72ce54f-1369-4176-a6a6-5bda5238cdfd.png)

*(BellBrook Labs 2018)*

# Software Architexture 

<p align="center">
  <img src="Software_Architecture.pdf">
</p>

[Software_Architecture.pdf](https://github.com/MuhammadAli-ai/Kinase-Website/files/7467023/Software_Architecture.pdf)


 


The software was developed using Flask as the main web development toolkit. Flask was chosen for it’s ease of use and simple functionality & how it connects the web framework & database queries written in Python to the web pages front end via the React library.



The front-end of the website is comprised of modern website technologies (JavaScript, HTML, CSS,REACT & Material-UI). IT was decided to utilise these modern front end technologies rather than Python and Bootstrap to give a more modern and sleek look to the website. Material-UI was essential to display information in tables and relevant tabs.

Plotly JavaScript is a popular graphing library that was used to visualise the foldchange values in bar graph form as well as Heatmap to show effects of inhibitors on phosphosites in the different tissue samples.

# Why are kinases important?
This process of phosphorylation (via Kinase enzyme) and it’s counterpart de-phosphorylation (via Phosphatase enzyme) enables the cell to regulate important physiological responses to both intracellular and extracellular signals.

Protein phosphorylation is found in all species and is crucial to a number of basic cellular processes such as; metabolism, growth, division, differentiation, motility, organelle trafficking, membrane transport, muscle contraction, immunity, learning and memory. Protein phosphor-regulation mechanisms are relevant to a number of biological functions and diseases meaning they are a key area for research!

# Features

The website will contain key information about kinases that biologists would be interested in:
- Name of Kinases
- Their respective inhibitors
- The proteins the Kinase act on
- Experimental phosphoproteome data of three different cell lines (HL60, MCF7, NTERA2) tissue samples that identify where Kinases act.
*This information was provided by Professor Conrad one of the researchers with Hijazi et al, 2020.*

Utilised the PKINFAM (https://www.uniprot.org/docs/pkinfam) document from Uniprot website(Modi & Dunbrack, 2019). As this information is stored from uniport
   6
it is updated regularly. 

The website makes use of APIs to key databases that store important information about kinases
- Uniprot (the Universal Protein Resource) ( https://www.uniprot.org ) enables access to a number of protein database via the identifyer i.e UniProtKB accession number (AC).
- Omnipath (https://omnipathdb.org/) API  is connected to the UniProtKB/Swiss-Prot database and provides info about proteins and their interactions.

# How to sue the website
There is only 1 query feature for the website where in the homepage individuals can type the name of the kinase into the search bar and once they type a minimum of 2 characters there will be a drop down list of kinases that match those kinases. As individuals type more this will limit the number of kinases that match those characters. Typically typing 3 or 4 characters will display the kinase of choice.


