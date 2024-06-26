const path = require("path");
const { ESLint } = require("eslint");

module.exports = {
  "./src/**/*.{ts,js,json}": async (fileNames) => {
    const escapedFileNames = fileNames.map((fileName) => path.resolve(fileName)).join(" ");
    const filesToLint = await removeIgnoredFiles(fileNames);

    return [
      `eslint --max-warnings=0 --cache --fix ${filesToLint}`,
      `prettier --relative --cache --write ${escapedFileNames}`,
      `git add ${escapedFileNames}`,
    ];
  },
};

async function removeIgnoredFiles(files) {
  const eslint = new ESLint();
  const isIgnored = await Promise.all(files.map((file) => eslint.isPathIgnored(file)));
  return files.filter((_, i) => !isIgnored[i]).join(" ");
}
