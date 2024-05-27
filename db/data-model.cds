namespace language_selector;

using { cuid, managed } from '@sap/cds/common';

entity Language: cuid, managed {
    name: String;    
}

entity Country: cuid, managed {
    flag: String;
    name  : String;    
    capital: String;
    language : Association to Language;
    population: Integer;
    region: String;
}
