$(function(){
  $(document).on('opening', '.modal', function() {
    console.log('Modal is opening');
  });
  $(document).on('opened', '.modal', function() {
    console.log('Modal is opening');
  });
  $(document).on('closing', '.modal', function() {
    console.log('Modal is closing');
  });
  $(document).on('closed', '.modal', function() {
    console.log('Modal is closed');
  });
});
