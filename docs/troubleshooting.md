# Troubleshooting

These are some troubleshooting tips for more common issues people might run into while developing, including more information on what might be happening and how to fix the problem.

- [Errors running scripts (e.g. `yarn dev`)](#errors-running-scripts-eg-yarn-dev)
- [Visual Studio (VS) Code formatting issues](#visual-studio-vs-code-formatting-issues)

## Errors running scripts (e.g. `yarn dev`)

Make sure you've followed the instructions for [Setup and development](development.md). If you already have, try deleting the `node_modules` folder and installing fresh:

```bash
# 1. Delete all previously-installed dependencies.
rm -rf node_modules

# 2. Install dependencies fresh.
yarn install
```

If that doesn't work, it's possible that a newer version of a dependency is creating a problem. If this is the problem, you can work around it by installing dependencies from the `yarn.lock` file of a previously working branch or commit.

```bash
# 1. Delete all previously-installed dependencies.
rm -rf node_modules

# 2. Use the same yarn.lock as the `origin/master` branch. If the problem
# exists on the `origin/master` as well, instead use the last-known
# working branch or commit.
git checkout origin/master -- yarn.lock

# 2. Install dependencies fresh, using only the exact versions specified
# in the `yarn.lock` file.
yarn install --frozen-lockfile
```

If this solves your problem, you can use `yarn outdated` to see the packages that may have received updates, then upgrade them one at a time with `yarn upgrade the-package-name` to see which upgrade introduces the problem.

## Visual Studio (VS) Code formatting issues

If you're using VS Code and notice that some files are being formatted incorrectly on save, the source is probably a formatter extension you've installed. The reason you're seeing it now is that this project enables the `editor.formatOnSave` setting. Previously, that extension was probably just doing nothing. To fix the problem, you'll need to either properly configure the extension or, if it's simply broken, uninstall it.

Extensions with known issues include:

- [Visual Studio Code Format](https://marketplace.visualstudio.com/items?itemName=ryannaddy.vscode-format#review-details)
