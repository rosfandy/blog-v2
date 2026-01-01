"use client";

import { Editor } from "@tiptap/react";
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdLink,
  MdImage,
  MdCode,
  MdFullscreen,
  MdExpandMore,
  MdFormatListBulleted,
  MdFormatListNumbered,
} from "react-icons/md";
import { useState, useEffect } from "react";

interface MenubarProps {
  editor: Editor | null;
}

/* ==============================
 * TOOL TYPES
 * ============================== */
type ToolItem = {
  icon: React.ReactNode;
  title: string;
  isActive?: (editor: Editor) => boolean;
  action: (editor: Editor) => void;
};

/* ==============================
 * TOOL CONFIGS
 * ============================== */
const textStyleTools: ToolItem[] = [
  {
    icon: <MdFormatBold />,
    title: "Bold",
    isActive: (e) => e.isActive("bold"),
    action: (e) => e.chain().focus().toggleBold().run(),
  },
  {
    icon: <MdFormatItalic />,
    title: "Italic",
    isActive: (e) => e.isActive("italic"),
    action: (e) => e.chain().focus().toggleItalic().run(),
  },
  {
    icon: <MdFormatUnderlined />,
    title: "Underline",
    isActive: (e) => e.isActive("underline"),
    action: (e) => e.chain().focus().toggleUnderline().run(),
  },
];

const alignTools: ToolItem[] = [
  {
    icon: <MdFormatAlignLeft />,
    title: "Align Left",
    isActive: (e) => e.isActive({ textAlign: "left" }),
    action: (e) => e.chain().focus().setTextAlign("left").run(),
  },
  {
    icon: <MdFormatAlignCenter />,
    title: "Align Center",
    isActive: (e) => e.isActive({ textAlign: "center" }),
    action: (e) => e.chain().focus().setTextAlign("center").run(),
  },
  {
    icon: <MdFormatAlignRight />,
    title: "Align Right",
    isActive: (e) => e.isActive({ textAlign: "right" }),
    action: (e) => e.chain().focus().setTextAlign("right").run(),
  },
];

const listTools: ToolItem[] = [
  {
    icon: <MdFormatListBulleted />,
    title: "Bullet List",
    isActive: (e) => e.isActive("bulletList"),
    action: (e) => e.chain().focus().toggleBulletList().run(),
  },
  {
    icon: <MdFormatListNumbered />,
    title: "Numbered List",
    isActive: (e) => e.isActive("orderedList"),
    action: (e) => e.chain().focus().toggleOrderedList().run(),
  },
];

const miscTools: ToolItem[] = [
  {
    icon: <MdLink />,
    title: "Insert Link",
    isActive: (e) => e.isActive("link"),
    action: (e) => {
      const url = prompt("Enter URL:");
      if (url) {
        e.chain().focus().setLink({ href: url }).run();
      }
    },
  },
  {
    icon: <MdImage />,
    title: "Insert Image",
    action: (e) => {
      const url = prompt("Enter image URL:");
      if (url) {
        // Note: Image extension not installed, placeholder
        alert("Image insertion not implemented yet");
      }
    },
  },
   {
     icon: <MdCode />,
     title: "Code Block",
     isActive: (e) => e.isActive("codeBlock"),
     action: (e) => e.chain().focus().toggleCodeBlock().run(),
   },
];

/* ==============================
 * COMPONENT
 * ============================== */
const Menubar: React.FC<MenubarProps> = ({ editor }) => {
  const [paragraphOpen, setParagraphOpen] = useState(false);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const update = () => forceUpdate(prev => prev + 1);
    editor.on('selectionUpdate', update);
    editor.on('update', update);

    return () => {
      editor.off('selectionUpdate', update);
      editor.off('update', update);
    };
  }, [editor]);

  if (!editor) return null;

  const renderTools = (tools: ToolItem[]) =>
    tools.map((tool, i) => {
      const active = tool.isActive?.(editor);
      return (
        <button
          key={i}
          type="button"
          title={tool.title}
          onClick={() => tool.action(editor)}
          className={`p-1.5 rounded transition-colors
            hover:bg-black/5 dark:hover:bg-white/10
            ${active ? "bg-primary/20 text-primary" : "text-gray-600 dark:text-gray-400"}
          `}
        >
          {tool.icon}
        </button>
      );
    });

  const paragraphLabel = editor.isActive("heading", { level: 1 })
    ? "Heading 1"
    : editor.isActive("heading", { level: 2 })
    ? "Heading 2"
    : editor.isActive("heading", { level: 3 })
    ? "Heading 3"
    : "Paragraph";

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-white/5 bg-white/40 dark:bg-white/5">

      {/* Text Styles */}
      <div className="flex items-center gap-1 pr-2 border-r border-gray-300 dark:border-white/10">
        {renderTools(textStyleTools)}
      </div>

      {/* Paragraph / Heading */}
      <div className="relative flex items-center px-2 border-r border-gray-300 dark:border-white/10">
        <button
          type="button"
          onClick={() => setParagraphOpen(!paragraphOpen)}
          className="flex items-center gap-1 px-2 py-1.5 text-xs font-bold rounded
            hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400"
        >
          {paragraphLabel}
          <MdExpandMore />
        </button>

        {paragraphOpen && (
          <div className="absolute top-full mt-1 w-36 bg-white dark:bg-neutral-900
            border border-gray-200 dark:border-white/10 rounded-md shadow-lg z-10">

            {[
              { label: "Paragraph", action: () => editor.chain().focus().setParagraph().run(), active: !editor.isActive("heading") },
              { label: "Heading 1", action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), active: editor.isActive("heading", { level: 1 }) },
              { label: "Heading 2", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
              { label: "Heading 3", action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), active: editor.isActive("heading", { level: 3 }) },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setParagraphOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs transition-colors
                  hover:bg-gray-100 dark:hover:bg-white/10
                  ${item.active ? "bg-primary/20 text-primary" : ""}
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Align */}
      <div className="flex items-center gap-1 px-2 border-r border-gray-300 dark:border-white/10">
        {renderTools(alignTools)}
      </div>

      {/* List & misc */}
      <div className="flex items-center gap-1 pl-2">
        {renderTools(miscTools)}
        {renderTools(listTools)}
      </div>

      {/* Right */}
      <div className="ml-auto">
        <button className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400">
          <MdFullscreen />
        </button>
      </div>
    </div>
  );
};

export default Menubar;
