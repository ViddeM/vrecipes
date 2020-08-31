# The backend architecture for the project VRecipes
This document is written to standardize and formalize the architecture behind this project.

## Structure
The project is built with a layered architecture where the top layer communicates with clients and the bottom layer with the database.
The layers are as follows: (left->right => top->bottom)

```
web_handler ->  query -> db
            \-> process ->  command -> db
                        \-> validation
```

* **Query:** The first of these paths, the query path, is used for requests that only need to query information from the database and does not modify the db (or any other persistant information) in any way.
* **Command:** The second of these paths, the command path, is used for any other request.
The process layer is encouraged to use the query layer whenever possible to avoid code duplication.
The validation layer validates input from clients and is allowed to use both the command and query layers.

Both the process and query layers can use helper methods but the methods used by the web_handler should always return HttpRequest type results.


