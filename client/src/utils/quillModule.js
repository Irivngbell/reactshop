const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'], // Faire qqchose pour que link fonctionne
    ['clean'],
  ],
};

export default modules;
