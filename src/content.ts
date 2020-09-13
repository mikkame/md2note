import marked from 'marked'
(() => {

    const defaultWrapper = document.querySelector('#note-editor-screen') as HTMLDivElement
    defaultWrapper.style.maxWidth = '100%';
    const preview = document.querySelector('#note-body') as HTMLDivElement;
    const previewParent = preview.parentElement;
    previewParent?.removeChild(preview)
    preview.contentEditable = 'false';
    preview.removeAttribute('data-placeholder')
    preview.style.width = 'calc(50% - 24px)';
    preview.style.paddingLeft = '24px';
    preview.style.float = 'left';
    preview.style.height = '100%';

    const editor = document.createElement('textarea') as HTMLTextAreaElement;
    editor.style.width = 'calc(50% - 24px)';
    editor.style.paddingLeft = '24px';
    editor.style.minHeight = '500px';
    editor.style.float ='left';
    editor.style.border = '1px gray solid';
    editor.placeholder = "markdown で記述できます。一部記法は消されますので必ず下書きで表示確認してください。";

    preview.querySelectorAll('figure[embedded-content-key]').forEach(node => {
        if (node.getAttribute('embedded-content-key')?.match(/^md2note:/)) {
            editor.value = decodeURI(node.getAttribute('embedded-content-key')?.replace('md2note:', '')!)
        }
    })
    editor.addEventListener('keyup', () => {
        preview.innerHTML = marked(editor.value)
            .replace('<em>','<b>')
            .replace('</em>','</b>')
            .replace(/<\/h\d>/, '</h3>')
            .replace(/<h\d /, '<h3 ')
            + `<figure embedded-content-key='md2note:${encodeURI(editor.value)}'></figure>`
        console.log(preview.innerHTML)
    })

    const customEditorDiv = document.createElement('div') as HTMLDivElement;
    customEditorDiv.append(editor)
    customEditorDiv.append(preview)

    previewParent?.append(customEditorDiv)


})();
