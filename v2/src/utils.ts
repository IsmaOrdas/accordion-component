export default function toDOMNode (htmlString: string) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(htmlString, "text/html");
	return doc.body.firstChild;
};