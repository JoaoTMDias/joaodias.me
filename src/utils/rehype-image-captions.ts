type TextNode = {
	type: "text";
	value: string;
};

type ElementNode = {
	type: "element";
	tagName: string;
	properties?: Record<string, unknown>;
	children: Array<TreeNode>;
};

type ParentNode = {
	children: Array<TreeNode>;
};

type TreeNode = ElementNode | TextNode | { type: string; [key: string]: unknown };

function isElement(node: TreeNode): node is ElementNode {
	return node.type === "element";
}

function createCaption(text: string): ElementNode {
	return {
		type: "element",
		tagName: "figcaption",
		properties: {},
		children: [{ type: "text", value: text }],
	};
}

function createFigure(image: ElementNode, caption: string): ElementNode {
	return {
		type: "element",
		tagName: "figure",
		properties: { className: ["article-image"] },
		children: [image, createCaption(caption)],
	};
}

function transformChildren(parent: ParentNode): void {
	for (let index = 0; index < parent.children.length; index += 1) {
		const child = parent.children[index];

		if (!isElement(child)) continue;

		if (child.tagName === "p" && child.children.length === 1) {
			const image = child.children[0];
			const caption =
				isElement(image) && image.tagName === "img" ? image.properties?.title : undefined;

			if (isElement(image) && typeof caption === "string" && caption.length > 0) {
				if (image.properties) delete image.properties.title;
				parent.children[index] = createFigure(image, caption);
				continue;
			}
		}

		const caption = child.tagName === "img" ? child.properties?.title : undefined;
		if (typeof caption === "string" && caption.length > 0) {
			if (child.properties) delete child.properties.title;
			parent.children[index] = createFigure(child, caption);
			continue;
		}

		transformChildren(child);
	}
}

export default function rehypeImageCaptions() {
	return (tree: ParentNode) => {
		transformChildren(tree);
	};
}
