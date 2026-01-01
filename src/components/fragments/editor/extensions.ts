import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

export const blogEditorExtensions = [
    StarterKit,
    Underline,
    TextAlign.configure({ types: ['heading', 'paragraph'] })
];