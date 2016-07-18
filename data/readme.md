# Templating Test Data

For our templating process we need test data, which should ideally have the same structure as the final project will have. 
Use ``data.yml`` to model your project's datastructures in collaboration with all team members. This file will then be parsed to an array and injected into the templates.

Every ``*.yml`` file will be automatically compiled to ``JSON`` using ``grunt watch``. This means you should **never edit ``*.json`` files**.