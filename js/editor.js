function renderTextArea() {
    var $preview, editor, mobileToolbar, toolbar;
    Simditor.locale = 'en-US';
    toolbar = ['title', 'bold', 'italic', 'underline', 'strikethrough', 'fontScale', 'color', '|', 'ol', 'ul', 'blockquote', 'code', 'table', '|', 'link', 'image', 'hr', '|', 'indent', 'outdent', 'alignment'];
    mobileToolbar = ["bold", "underline", "strikethrough", "color", "ul", "ol"];

    var editor1 = new Simditor({
        textarea: $('#editor1'),
        placeholder: 'Digite o conteúdo',
        toolbar: toolbar,
        pasteImage: true,
        defaultImage: 'assets/images/image.png',
        upload: location.search === '?upload' ? {
            url: '/upload'
        } : false
        //optional options
    });
    var editor2 = new Simditor({
        textarea: $('#editor2'),
        placeholder: 'Digite o conteúdo',
        toolbar: toolbar,
        pasteImage: true,
        defaultImage: 'assets/images/image.png',
        upload: location.search === '?upload' ? {
            url: '/upload'
        } : false
        //optional options
    });
    var editor3 = new Simditor({
        textarea: $('#editor3'),
        placeholder: 'Digite o conteúdo',
        toolbar: toolbar,
        pasteImage: true,
        defaultImage: 'assets/images/image.png',
        upload: location.search === '?upload' ? {
            url: '/upload'
        } : false
        //optional options
    });
};