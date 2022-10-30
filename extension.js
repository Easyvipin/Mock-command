// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const { PLACEHOLDER_IMAGE_DIMENSIONS } = require("./utils/constants");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "mockcommand" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "mockcommand.mockImage",
    async function () {
      const dimensions = await vscode.window.showQuickPick(
        PLACEHOLDER_IMAGE_DIMENSIONS,
        {
          matchOnDetail: true,
        }
      );
      if (dimensions == null) return;

      let inputDimenstion = dimensions.label.split(" ").join("");
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        "mockcommand", // Identifies the type of the webview. Used internally
        `${inputDimenstion}`, // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
      );
      panel.webview.html = getWebviewContent(inputDimenstion);
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(dimension) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://via.placeholder.com/${dimension}" width="300" />
    <br>
    <a href="https://via.placeholder.com/${dimension}">https://via.placeholder.com/${dimension}</a>
</body>
</html>`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

/* editor.action.addCommentLine */
