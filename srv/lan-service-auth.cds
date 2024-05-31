using {
    LanguageService.Logs,
    LanguageService.usingExternalApi
} from './lan-service';

annotate Logs with @readonly;
annotate usingExternalApi with @(requires: 'authenticated-user');
