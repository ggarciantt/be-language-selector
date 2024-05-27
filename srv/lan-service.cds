using language_selector as ls from '../db/data-model';

service LanguageService {
    entity Country  as projection on ls.Country;
    entity Language as projection on ls.Language;
}
