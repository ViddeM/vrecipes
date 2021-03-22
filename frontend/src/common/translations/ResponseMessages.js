const translations = {
    recipe_name_exists: "Ett recept med det namnet finns redan",
    recipe_not_found: "Receptet hittades inte",
    invalid_json: "Ett internt fel har inträffat (felaktig json)",
    failed_to_create_recipe: "Misslyckades med att skapa recept",
    missing_file: "Fil saknas",
    bad_image: "Trasig bild",
    failed_to_save_image: "Kunde inte spara bild",
    failed_to_retrieve_recipes: "Kunde inte hämta recept",
    failed_to_retrieve_recipe: "Kunde inte hämta recept",
    failed_to_edit_recipe: "Kunde inte ändra recept",
    malformed_recipe_id: "Internt fel (felaktig recept id)"
}

export const DEFAULT_ERROR = "Whoops något gick fel :("
export const FAILED_TO_LOAD_RECIPES = "Kunde inte ladda recept"

export function translate(message) {
    if (!(message in translations)) {
        return "Ingen översättning tillgänglig (" + message + ")";
    }
    return translations[message];
}