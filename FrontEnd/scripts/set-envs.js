require('dotenv').config();
const {writeFileSync, mkdirSync} = require('fs');

const targetPath = './src/environments';
const fileContent = `
export const environments = {
    url_api: "${process.env['URL_API']}",
}
`;

mkdirSync(targetPath, {recursive: true});
writeFileSync(`${targetPath}/environmets.ts`, fileContent);