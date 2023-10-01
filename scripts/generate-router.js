import { Command } from 'commander';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

const program = new Command();

program
  .description('path 기준으로 controller, service 코드를 생성합니다.')
  .requiredOption('-p, --path <path>', 'pathName')
  .parse();

const options = program.opts();
const apiPath = options.path;

const existPath = existsSync(`src/routes/${apiPath}`);

if (existPath) {
  console.info(`${apiPath} 가 이미 존재합니다.`);
  console.info(`already exist directory src/routes/${apiPath}`);

  process.exit();
}

const createPascalCase = (...rest) => {
  return rest
    .map((el) => {
      return el[0].toUpperCase() + el.slice(1);
    })
    .join('');
};

const servicePath = `src/services/${apiPath}`;
const serviceFileName = `${servicePath}/${apiPath}.service.js`;
const serviceSpecFileName = `src/services/${apiPath}/${apiPath}.service.spec.js`;

const ctrlPath = `src/routes/${apiPath}`;
const ctrlFileName = `${ctrlPath}/${apiPath}.ctrl.js`;
const ctrlSpecFileName = `src/routes/${apiPath}/${apiPath}.ctrl.spec.js`;
const ctrlIndexFileName = `src/routes/${apiPath}/index.js`;

const routeFileName = `src/routes/index.js`;

mkdirSync(servicePath);
mkdirSync(ctrlPath);

if (!existsSync(serviceFileName)) {
  const description = `export class ${createPascalCase(apiPath, 'service')} {};
  `;

  writeFileSync(serviceFileName, description);
}

if (!existsSync(serviceSpecFileName)) {
  const description = `import { ${createPascalCase(
    apiPath,
    'service'
  )} } from './${apiPath}.service.js';
  
describe('${createPascalCase(apiPath, 'service')}', () => {
  const ${apiPath}Service = new ${createPascalCase(apiPath, 'service')};

  afterEach(() => {
    jest.clearAllMocks();
  });
});
`;

  writeFileSync(serviceSpecFileName, description);
}

if (!existsSync(ctrlFileName)) {
  const description = `import { ${createPascalCase(
    apiPath,
    'service'
  )} } from '../../services/${apiPath}/${apiPath}.service.js';
  
const ${apiPath}Ctrl = {};

export default ${apiPath}Ctrl;
  `;

  writeFileSync(ctrlFileName, description);
}

if (!existsSync(ctrlSpecFileName)) {
  const description = `import { ${apiPath}Service } from '../../services/${apiPath}.service.js';

jest.mock('../../services/${apiPath}.service.js');

describe('${apiPath}Ctrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
});
`;

  writeFileSync(ctrlSpecFileName, description);
}

if (!existsSync(ctrlIndexFileName)) {
  const description = `import { Router } from 'express';
import ${apiPath}Ctrl from './${apiPath}.ctrl.js';
  
const router = Router();
  
export default router;
  `;

  writeFileSync(ctrlIndexFileName, description);
}

const routesFile = readFileSync(routeFileName).toString().split('\n');

const imports = routesFile.filter((el) => el.startsWith('import'));
const constants = routesFile.filter((el) => el.startsWith('const'));
const routers = routesFile.filter((el) => el.startsWith('router'));
const exports = routesFile.filter((el) => el.startsWith('export'));

imports.push(`import ${apiPath} from './${apiPath}/index.js';`);
routers.push(`router.use('/${apiPath}', ${apiPath});`);

const newRoutesFile = [
  imports.join('\n'),
  '\n\n',
  constants.join('\n'),
  '\n\n',
  routers.join('\n'),
  '\n\n',
  exports.join('\n'),
  '\n',
].join('');

writeFileSync(routeFileName, newRoutesFile);
