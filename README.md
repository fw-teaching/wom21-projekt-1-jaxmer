## Projekt 1 - Stugmäklaren
### Webbtjänster och molnteknologi 21

# Notes
Ctrl + C to close the loop/server thingy

'Inside' Node use following command to create a random SECRET:
require('crypto').randomBytes(32).toString('hex')

- When using .findOne you need to add .exec() to run the line of code
- In .find(filter) we can add a filter to choose what we want to find