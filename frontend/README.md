# VRecipes nextjs frontend

This is a new frontend for the VRecipes recipe management service.

## Aims & Goals of rewrite

The main goal of the rewrite is to clean up the code and make general improvements to the project. Whilst doing this,
however, we would also like to simplify the process of porting VRecipes to TasteIT (the chalmers.it variant of the
service). For this purpose a number of new features will be included in this version:

- Localization: VRecipes users will most likely want the page to be in swedish whilst TasteIT users might want it in
  english, thus localization should be built in by default.
- Improve modularization of the styling so that the service can be easily restyled for TasteIT (e.g. using CSS
  variables).

## Setup for development

1. Copy `.env.example` to `.env`
2. Start the frontend, db and adminer using `docker-compose up`
3. Start the backend (e.g. using Goland)
4. (optional) Insert mock data using `make mock`
5. Access the website via `http://localhost:3000`


## Libraries & dev notes

The main library/framework in use is NextJS: https://nextjs.org/ which will take care of most things necessary for the
project.

### Localization

Localization of the project is handled by next-i18next: https://github.com/isaachinman/next-i18next/tree/master. The
locations of the different locales can be found in `public/locales/[locale]/`. Preferably every context should have its
own file and general things can be put in `common.json`. For a page to use translations it needs to include a call
to `serverSideTranslations` from a **server-side** function. Note that this must be done from a file within the `/pages`
folder and thus cannot be in `components`.

