const path = require("path");
const { ESLint } = require("eslint");

module.exports = {
  "./src/**/*.{ts,tsx,js,json}": async (fileNames) => {
    const escapedFileNames = fileNames.map((fileName) => path.resolve(fileName)).join(" ");
    const filesToLint = await removeIgnoredFiles(fileNames);

    return [
      `prettier --relative --cache --write ${escapedFileNames}`,
      `eslint --cache --fix ${filesToLint}`, //  --max-warnings=0 
      `git add ${escapedFileNames}`,
    ];
  },
};

async function removeIgnoredFiles(files) {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
  return files.filter((_, i) => !isIgnored[i]).join(" ");
}
