const translations = {
    recipe_name_exists: "Ett recept med det namnet finns redan",
    recipe_not_found: "Receptet hittades inte :(",
    invalid_json: "Ett internt fel har inträffat (felaktig json)"
}

export const DEFAULT_ERROR = "Whoops något gick fel :("
export const FAILED_TO_LOAD_RECIPES = "Kunde inte ladda recept"

export function translate(message) {
    if (!(message in translations)) {
        return "Ingen översättning tillgänglig :(";
    }
    return translations[message];
}