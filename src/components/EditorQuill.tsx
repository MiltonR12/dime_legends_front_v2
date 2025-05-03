import ReactQuill, { Quill } from "react-quill"
import { useRef } from "react"
import { FaListOl, FaListUl } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { BsYoutube } from "react-icons/bs";
import { TbPhotoSquareRounded } from "react-icons/tb";

const Link = Quill.import('formats/link');

export const MenuMidium = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    ["bold", "italic", "underline", "strike", "blockquote", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
};

type Props = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onKeyDown?: (e: React.KeyboardEvent) => void
  defaultValue?: string
  className?: string
  tools?: {
    video: boolean
    image: boolean
    listOrder: boolean
    listUnorder: boolean
  }
}

class CustomLink extends Link {
  static create(value: string) {
    const node = super.create(value);
    // Agregar el atributo target="_blank" a los enlaces
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
    return node;
  }
}

Quill.register(CustomLink, true);

function EditorQuill({
  value,
  onChange,
  placeholder = "Escribe el contenido",
  onKeyDown,
  defaultValue,
  className,
  tools = {
    video: true,
    image: true,
    listOrder: true,
    listUnorder: true
  }
}: Props) {

  const quillRef = useRef<ReactQuill | null>(null);
  const fileInputRef = useRef<null | HTMLInputElement>(null);

  const addVideo = () => {
    let url = prompt('URL del video');

    if (!url) return;

    const youtubeMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (youtubeMatch) {
      url = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    const range = quillRef.current?.getEditor().getSelection()?.index || 0;

    quillRef.current?.getEditor().clipboard.dangerouslyPasteHTML(
      range,
      `<iframe width="560" height="315" src="${url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    );
  };

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!quillRef.current || !file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const quillEditor = quillRef.current?.getEditor()
      const range = quillEditor?.getSelection();
      if (range) {
        quillEditor?.insertEmbed(range.index, 'image', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addListOrder = () => {
    const quillEditor = quillRef.current?.getEditor();
    const range = quillEditor?.getSelection();

    if (range) {
      quillEditor?.clipboard.dangerouslyPasteHTML(
        range.index,
        `<ol><li></li></ol>`
      );
      quillEditor?.setSelection(range.index, 0);
    }
  };

  const addListUnorder = () => {
    const quillEditor = quillRef.current?.getEditor();
    const range = quillEditor?.getSelection();

    if (range) {
      quillEditor?.clipboard.dangerouslyPasteHTML(
        range.index,
        `<ul><li></li></ul>`
      );
      quillEditor?.setSelection(range.index, 0);
    }
  }

  return (
    <div className='midium'>
      <ReactQuill
        defaultValue={defaultValue}
        ref={quillRef}
        value={value}
        onChange={onChange}
        theme='bubble'
        placeholder={placeholder}
        modules={MenuMidium}
        className={cn("", className)}
        onKeyDown={onKeyDown}
      />
      {tools.image || tools.video || tools.listOrder || tools.listUnorder ? (<div>

        <h3 className="text-sm pb-2 text-gray-600" >
          Barra de herramientas
        </h3>

        <div className='flex gap-2' >
          {tools.image && <Button onClick={addImage} size="icon"
            className="p-1 w-7 h-7 md:w-8 md:h-8"  >
            <TbPhotoSquareRounded className="md:text-lg" />
          </Button>}
          {tools.video && <Button onClick={addVideo} size="icon"
            className="p-1 w-7 h-7 md:w-8 md:h-8" >
            <BsYoutube className="text-gray-600 md:text-lg" />
          </Button>}
          {tools.listOrder && <Button onClick={addListOrder} size="icon"
            className="p-1 w-7 h-7 md:w-8 md:h-8" >
            <FaListOl className="text-gray-600 md:text-lg" />
          </Button>}
          {tools.listUnorder && <Button onClick={addListUnorder} size="icon"
            className="p-1 w-7 h-7 md:w-8 md:h-8" >
            <FaListUl className='text-gray-600 md:text-lg' />
          </Button>}
        </div>
      </div>) : null}
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
    </div>
  )
}

export default EditorQuill