"use client";

import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
// Basic Tiptap styles
import './Editor.css';
import { blogEditorExtensions } from './extensions';
import Menubar from './Menubar';

interface EditorProps {
    initialContent?: string;
    lastSaved: string;
}

export interface EditorRef {
    getHTML: () => string;
    setContent: (content: string) => void;
    editor: Editor | null;
}

const EditorComponent = forwardRef<EditorRef, EditorProps>(({ initialContent = '', lastSaved }, ref) => {
    const [wordCount, setWordCount] = useState(0);

    const editor = useEditor({
        extensions: blogEditorExtensions,
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
        },
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const text = editor.getText();
            const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
            setWordCount(words);
        },
    });

    useEffect(() => {
        if (editor) {
            const text = editor.getText();
            const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
            setWordCount(words);
        }
    }, [editor]);

    useImperativeHandle(ref, () => ({
        getHTML: () => editor?.getHTML() || '',
        setContent: (content: string) => editor?.commands.setContent(content),
        editor,
    }));

    return (
        <div className="flex flex-col h-full">
            <Menubar editor={editor} />
            <div className="flex-1 p-6 overflow-y-auto">
                <EditorContent
                    editor={editor}
                    className="min-h-96 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none text-gray-800 dark:text-gray-200"
                />
            </div>
            <div className="px-4 py-2 border-t border-gray-200 dark:border-white/5 bg-white/40 dark:bg-white/5 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
                <span>Last saved: {lastSaved}</span>
                <span>{wordCount} words</span>
            </div>
        </div>
    );
});

EditorComponent.displayName = 'EditorComponent';

export default EditorComponent;