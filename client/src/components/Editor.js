import ReactQuill from "react-quill";
const modules = {
	toolbar: [
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		["bold", "italic", "underline", "strike"], // toggled buttons
		["link", "image"],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ indent: "-1" }, { indent: "+1" }], // outdent/indent

		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		[{ align: [] }],

		["clean"], // remove formatting button
	],
};

const formats = [
	"header",
	"bold",
	"italic",
	"underline",
	"strike",
	"blockquote",
	"link",
	"bullet",
	"indent",
	"link",
	"image",
];
export default function Editor({value, onChange}){
    return (
		<ReactQuill
			value={value}
			modules={modules}
			formats={formats}
			onChange={(newValue) => onChange(newValue)}
		/>
	);
}