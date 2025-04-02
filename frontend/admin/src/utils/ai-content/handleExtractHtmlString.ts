export const extractHtmlString = (
    html: string
): Promise<{ title: string; body: string }> => {
    return new Promise((resolve, reject) => {
        try {
            // Create a DOM parser
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Extract the title
            const title = doc.querySelector("title")?.textContent || "";

            // Extract the body (including tags and content)
            const body = doc.querySelector("body")?.innerHTML || "";

            // Resolve the promise with title and body
            resolve({ title, body });
        } catch (error) {
            // Reject the promise in case of an error
            reject(new Error("Failed to parse HTML string."));
        }
    });
};
