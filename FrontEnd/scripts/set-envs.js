require('dotenv').config();
const {writeFileSync, mkdirSync} = require('fs');

const targetPath = './src/environments';
const fileContent = `
export const environments = {
    url_api: "${process.env['URL_BACK']}",
}
`;

mkdirSync(targetPath, {recursive: true});
writeFileSync(`${targetPath}/environments.ts`, fileContent);