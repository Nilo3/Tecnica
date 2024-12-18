import fs from 'fs';

export const swaggerDocumentationSpec = JSON.parse( fs.readFileSync('src/documentation/swagger/swagger.json', 'utf-8'));