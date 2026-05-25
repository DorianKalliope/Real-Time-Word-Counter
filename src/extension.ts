import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Create a status bar item at the bottom right
    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    // Function to count words and update the status bar
    function updateWordCount() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            statusBarItem.text = "Word Count: 0";
            return;
        }

        const text = editor.document.getText();
        // Split by whitespace and remove empty entries
        const words = text.split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;
        statusBarItem.text = `📝 Word Count: ${wordCount}`;
    }

    // Initial update
    updateWordCount();

    // Update when switching to another file
    vscode.window.onDidChangeActiveTextEditor(updateWordCount, null, context.subscriptions);
    
    // Update when typing in the current file
    vscode.workspace.onDidChangeTextDocument(event => {
        if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
            updateWordCount();
        }
    }, null, context.subscriptions);
}

export function deactivate() {}