$(function(){
  // Confirmation pour les suppressions
  $(".delete").click(function(e){
    return confirm("Êtes vous sûr de vouloir supprimer cet élément ?");
  });
});
