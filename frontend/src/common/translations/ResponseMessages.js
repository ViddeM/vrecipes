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
    malformed_recipe_id: "Internt fel (felaktig recept id)",
    failed_to_delete_recipe: "Kunde inte ta bort recept",
    failed_to_authenticate: "Kunde inte autentisera användaren",
    invalid_user_id: "Felaktigt användar-id",
    not_authorized: "Inte autentiserad",
    filetype_not_supported: "Filformatet stöds ej",
    internal_error: "Internt fel",
    incorrect_user: "Felaktig användare inloggad",
    recipe_book_name_exists: "En receptbok med det namnet finns redan",
    failed_to_create_recipe_book: "Misslyckades med att skapa receptbok",
    recipe_book_not_found: "Receptboken hittades inte",
    malformed_recipe_book_id: "Internt fel (felaktig receptboks id)",
    failed_to_edit_recipe_book: "Kunde inte ändra receptbok",
    failed_to_retrieve_recipe_book: "Kunde inte hämta receptbok",
    failed_to_retrieve_recipe_books: "Kunde inte hämta receptböcker",
    failed_to_delete_recipe_book: "Kunde inte ta bort receptbok",
    tag_name_taken: "Tag namnet är redan taget",
    failed_to_create_tag: "Kunde inte skapa tag",
}

export const DEFAULT_ERROR = "Whoops något gick fel :("
export const FAILED_TO_LOAD_RECIPES = "Kunde inte ladda recept"
export const FAILED_TO_LOAD_RECIPE_BOOKS = "Kunde inte ladda receptböcker"
export const FAILED_TO_LOAD_RECIPE_BOOK = "Kunde inte ladda receptbok"

export function translate(message) {
    if (!(message in translations)) {
        return "Ingen översättning tillgänglig (" + message + ")";
    }
    return translations[message];
}
