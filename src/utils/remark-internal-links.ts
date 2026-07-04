import { visit } from "unist-util-visit";
import type { Root, Link } from "mdast";

const COLLECTION_MAP: Record<string, string> = {
    note: "notes",
    blog: "blog",
    project: "projects",
};

export default function remarkInternalLinks() {
    return (tree: Root) => {
        const footnoteRenders: {
            identifier: string;
            prefix: string | null;
            slug: string;
            context: string;
        }[] = [];
        const declaredDefinitions = new Set<string>();

        // 1. Track any manually declared footnote text blocks at the bottom of the file
        visit(tree, "footnoteDefinition", (node: any) => {
            if (node.identifier) {
                declaredDefinitions.add(node.identifier);
            }
        });

        // 2. Intercept text strings to parse links and inline footnotes
        visit(tree, "text", (node: any, index, parent) => {
            if (!parent || index === undefined) return;

            const combinedRegex = /\[\^(\d+)(?::([a-z]+):([^\]]+))?\]/g;

            if (combinedRegex.test(node.value)) {
                combinedRegex.lastIndex = 0;
                const originalText = node.value;
                const newChildren: any[] = [];
                let lastIndex = 0;
                let match;

                while ((match = combinedRegex.exec(originalText)) !== null) {
                    const matchIndex = match.index;
                    const [fullMatch, fnNum, prefix, slug] = match;

                    // Append leading text
                    if (matchIndex > lastIndex) {
                        newChildren.push({
                            type: "text",
                            value: originalText.slice(lastIndex, matchIndex),
                        });
                    }

                    // Case A: Custom dynamic internal collection reference
                    if (prefix && slug && COLLECTION_MAP[prefix]) {
                        newChildren.push({
                            type: "html",
                            value: `<sup id="fnref-${fnNum}"><a href="#fn-${fnNum}" class="footnote-ref">${fnNum}</a></sup>`,
                        });

                        const targetUrl = `/${COLLECTION_MAP[prefix]}/${slug}/`;
                        const friendlyName =
                            prefix.charAt(0).toUpperCase() + prefix.slice(1);

                        footnoteRenders.push({
                            identifier: fnNum,
                            prefix,
                            slug,
                            context: `${friendlyName} Reference: <a href="${targetUrl}">${targetUrl}</a>`,
                        });
                    }
                    // Case B: Standard orphaned tag lacking a definition block
                    else if (!declaredDefinitions.has(fnNum)) {
                        newChildren.push({
                            type: "html",
                            value: `<sup id="fnref-${fnNum}"><a href="#fn-${fnNum}" class="footnote-ref">${fnNum}</a></sup>`,
                        });

                        const textBefore = originalText
                            .slice(Math.max(0, matchIndex - 25), matchIndex)
                            .trim();
                        const words = textBefore
                            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
                            .split(/\s+/);
                        const contextSnippet = words.slice(-4).join(" ");
                        const fallbackSnippet = contextSnippet
                            ? `"${contextSnippet}..."`
                            : "Specified text anchor";

                        footnoteRenders.push({
                            identifier: fnNum,
                            prefix: null,
                            slug: "",
                            context: `Auto-generated stub for <em>${fallbackSnippet}</em> — Details pending reference allocation.`,
                        });

                        declaredDefinitions.add(fnNum);
                    } else {
                        // Standard footnote with existing markdown definition
                        newChildren.push({
                            type: "footnoteReference",
                            identifier: fnNum,
                            label: fnNum,
                        });
                    }

                    lastIndex = combinedRegex.lastIndex;
                }

                if (lastIndex < originalText.length) {
                    newChildren.push({
                        type: "text",
                        value: originalText.slice(lastIndex),
                    });
                }

                parent.children.splice(index, 1, ...newChildren);
            }
        });

        // 3. Append the custom references section to the bottom if automated notes exist
        if (footnoteRenders.length > 0) {
            tree.children.push({
                type: "html",
                value: '<hr class="footnotes-sep" />',
            } as any);

            let htmlContainer =
                '<section class="footnotes"><ol class="footnotes-list">';

            footnoteRenders.forEach(({ identifier, context }) => {
                htmlContainer += `
          <li id="fn-${identifier}" class="footnote-item">
            <p>${context} <a href="#fnref-${identifier}" class="footnote-backref">↩</a></p>
          </li>`;
            });

            htmlContainer += "</ol></section>";

            tree.children.push({
                type: "html",
                value: htmlContainer,
            } as any);
        }

        // 4. Process standard absolute/relative inline link transformations [Text](prefix:slug)
        visit(tree, "link", (node: Link) => {
            const match = node.url.match(/^([a-z]+):(.+)$/);
            if (match) {
                const [_, prefix, slug] = match;
                if (COLLECTION_MAP[prefix]) {
                    node.url = `/${COLLECTION_MAP[prefix]}/${slug}/`;
                }
            }
        });
    };
}
