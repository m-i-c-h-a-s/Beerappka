export const initEditor = {
    height: 500,
    menubar: false,
    images_upload_handler: function(blobInfo: any, success: any, failure: any) {
      var reader = new FileReader();
      reader.readAsDataURL(blobInfo.blob());
      reader.onload = function () {
          success(this.result);
      }
    },
    plugins: [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
    'undo redo | formatselect | bold italic backcolor | \
    alignleft aligncenter alignright alignjustify | \
    bullist numlist outdent indent | removeformat | image | help'
};