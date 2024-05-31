namespace language_selector;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Logs : cuid, managed {
    selectedLanguage : String;    
}
