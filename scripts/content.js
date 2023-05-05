const issueNumberElement = document.getElementById("key-val");
if (issueNumberElement) {
    addCopyToMarkdownButton(issueNumberElement.parentElement);
}

function addCopyToMarkdownButton(root) {
    const copyButton = document.createElement("button");
    copyButton.title = "Copy jira issue number to clipboard as markdown";
    copyButton.classList.add("copy-to-md-button");
    copyButton.addEventListener("click", async () => {
        const markdown = craeteMarkdownLink();
        const success = await saveToClipboard(markdown);
        showNotification(root, success);
    });

    root.appendChild(copyButton);
}

function craeteMarkdownLink() {
    const url = location.origin + location.pathname;
    const text = url.split("/").pop();

    return `[${text}](${url})`;
}

async function saveToClipboard(markdown) {
    try {
        await navigator.clipboard.writeText(markdown);
        return true;
    }
    catch {
        return false;
    }
}

function showNotification(root, success) {
    const notification = document.createElement("span");
    notification.classList.add("copy-to-md-notification");
    notification.classList.add(`copy-to-md-notification--${success ? "success" : "error"}`);
    notification.textContent = success ? "Copied" : "No acesss to clipboard";
    root.appendChild(notification);

    setTimeout(() => notification.remove(), 800);
}