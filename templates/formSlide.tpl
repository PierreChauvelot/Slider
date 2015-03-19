<form method="post" action="admin.php?action=insertUpdateSlide" enctype="multipart/form-data">
  <label for="titre">Titre</label>
  <input type="text" id="titre" name="titre" value="{if isset($slide->titre)}{$slide->titre}{/if}" /><br />
  
  <label for="description">Description</label>
  <textarea id="description" name="description">{if isset($slide->titre)}{$slide->titre}{/if}</textarea><br />
  
  <label for="image">Image</label>
  <input type="file" id="image" name="image" accept=".jpg" /><br />
  
  <label for="son">Son</label>
  <input type="file" id="son" name="son" accept=".mp3" /><br />
  
  {if isset($slide->id)}<input type="hidden" name="id_slide" value="{$slide->id}" />{/if}
  <input type="hidden" name="id_slider" value="{$smarty.get.id_slider}" />
  
  <input type="submit" value="{if isset($slide)}Modifier{else}Ajouter{/if}" />
</form>