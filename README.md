# Vrecipes

A recipe management website.

## Development setup
To setup the development of the project there are some things that are necessary to be setup.

### Frontend
For the frontend the following steps are necessary:
1. Install the node dependencies in the `frontend/` folder (e.g. whilst inside of the `frontend/` folder run `yarn` or equivalent command).
1. Be aware that there is a `.env.development` file in the `frontend/` folder, however it should work out of the box on any `linux` based system. 
1. In the **project root** folder, run `docker-compose up`. 

### Backend
The backend is not included into the `docker-compose` to simplify developing the backend without having to restart everything else.  
The steps to setup the backend is as follows (all of these assume that you are inside of the `backend/` folder):
1. Copy the `.env.example` file to `.env`, an explaination of all the fields in this file can be found [below](#environment-variables).
1. Create a `whitelist.json` (path can be determined by the `whitelist` environment variable), 
   this file describes which emails are allowed for oauth2 login, see [below](#whitelist) for the schema for this file.
1. Either setup oauth2 login using one of the supported providers (github/facebook/microsoft/google) or set the `auth_enabled` environment variable to `false`.
1. Run the main method in `backend/cmd/vrecipes/main.go`.

## Environment variables
The environment variables that can / have to be specified for the project.
Note that for the moment ALL variables must exist / be non-empty to start the project.

### Frontend
 - `REACT_APP_MODE` (string): Possible values and their meaning:
    - `prod`: Production mode.
    - `beta`: *deprecated* print a warning label on the page regarding the beta-status of the project.
    - `develop`: Development mode, displays a `debug` header on the top of the page.
 - `HTTP_PROXY` (string): Only used for development, specifies where to proxy http requests, default is `http://host.docker.internal:5000` which (together with the `docker-compose`) specifies the host machine on port `5000` where the backend should exist in development.

### Backend
 - `db_user` (string): Username for the database.
 - `db_password` (string): Password for the database.
 - `db_name` (string): Name of the database.
 - `db_host` (string): Host address for the database.
 - `reset_db` (boolean): Whether to clear the database on startup or not.
 - `image_folder` (string): Path to where uploaded images should be stored.
 - `whitelist` (string): Path to the `whitelist.json` file (explained [below](#whitelist)).
 - `secret` (string): Secret used to encrypt session cookies with.
 - `GIN_MODE` (string): The mode for the `Gin` framework, see [github](https://github.com/gin-gonic/gin).
 - `PORT` (integer): The port to host the backend on.
 - `auth_enabled` (boolean): When set to true, bypasses oauth2 and sets the user to a `test` user.

#### Oauth2 variables
Here follows environment variables related to the currently supported oauth2 providers.
The following 3 are exists for all of them where they are prefixed with the name of the provider (i.e. `github`, `google`, `facebook` or `microsoft`).
 - `_client_id`: The client id, retrieved when setting up the oauth2 service.
 - `_secret`: The secret, retrieved when setting up the oauth2 service.
 - `redirect_uri`: The uri to redirect to with the response from the provider (should be **frontend base url**`/api/auth/`**provider name**`/callback`).

A part from these some providers require extra fields as specified here:
##### Github
 - `github_user_endpoint`: The endpoint from where to retrieve github user information.
 - `github_user_email_endpoint`: The endpoint from where to retrieve github user email address information.

##### Facebook
 - `facebook_me_uri`: The uri to retrieve user information from the facebook api.

##### Microsoft
 - `microsoft_me_uri`: THe uri to retrieve user information from the microsoft api.

#### Whitelist
The whitelist file specifies who can login through the oauth2 endpoints, note that this specifies emails and that an email is valid for any of the providers.
The format for the file should be:
```json=
{
  "whitelisted_emails": [
    "email@email.ocm",
    ...
  ]
}
```