/**
 * This is a very basic utility to capture the token into a local file
 * so passing the variable can be omitted
 */

import { homedir } from 'node:os';
import { writeFile, mkdir, access } from 'node:fs/promises';

if (process.argv.length < 3) {
  console.error(
    `usage:
> npm authenticate {YOUR_TOKEN}
`,
    '\n',
  );
  process.exit(1);
}
const token = process.argv[2];
const waldoDir = `${homedir()}/.waldo`;

(async () => {
  const exists = await access(waldoDir)
    .then(() => true)
    .catch(() => false);
  if (!exists) {
    await mkdir(waldoDir, { recursive: true });
    console.log(`Initialized waldo directory at ${waldoDir}`);
  }
  const profilePath = `${waldoDir}/profile.yml`;
  await writeFile(
    profilePath,
    `format_version: 1
user_token: ${token}
`,
    'utf-8',
  );
  console.log(`Captured Waldo credentials at ${profilePath}`);
})();
