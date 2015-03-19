<form method="post" action="admin.php?action=insertUpdateSlider{if isset($slider->id)}&id={$slider->id}{/if}" enctype="multipart/form-data">
  <label for="titre">Titre</label>
  <input type="text" id="titre" name="titre" value="{if isset($slider->titre)}{$slider->titre}{/if}" /><br />
  
  {if isset($slider->id)}<input type="hidden" name="id_slider" value="{$slider->id}" />{/if}
  
  <input type="submit" value="{if isset($slider)}Modifier{else}Ajouter{/if}" />
</form>