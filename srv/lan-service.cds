using language_selector as ls from '../db/data-model';

@path: '/language'
// service LanguageService @(requires: 'authenticated-user') {
service LanguageService {
    entity Logs @readonly as projection on ls.Logs;

    function usingExternalApi(language : String) returns array of {
        name : String;
        capital : array of String;
        continent : String;
        flag : String;
        population : Integer;
    };
}
