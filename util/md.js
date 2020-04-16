import insane from "insane";
import marked from "marked";
import hljs from "highlight.js";

marked.setOptions({
	breaks: true,
	highlight: (code, lang) =>
		lang && hljs.getLanguage(lang)
			? hljs.highlight(lang, code).value
			: hljs.highlightAuto(code).value
});

export default content => marked(insane(content));
