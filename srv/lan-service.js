const cds = require("@sap/cds");
const axios = require("axios");

class LogsService extends cds.ApplicationService {
  init() {
    this.on("usingExternalApi", this.returningDataFromApi);
    return super.init();
  }

  async returningDataFromApi(req) {
    const { language } = req.data;

    const tx = cds.transaction(req);

    try {
      await tx.run(
        INSERT.into("language_selector.Logs").entries({
          selectedLanguage: language,
        })
      );

      const { data } = await axios.get(
        "https://restcountries.com/v3.1/lang/" + language
      );

      const countries = data.map((country) => ({
        name: country.name.common,
        capital: country.capital,
        continent: country.region,
        flag: country.flag,
        population: country.population,
      }));

      return countries;
    } catch (error) {
      await tx.rollback();
      req.error(
        500,
        "Failed to log the activity or fetch data from external API"
      );
    }
    await tx.commit();
  }
}

module.exports = LogsService;
