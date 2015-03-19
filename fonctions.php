<?php
define("URL_BDD", "bdd.json");

####################################################################################################
########################################## REQUËTES JSON ###########################################
####################################################################################################
/**
 * Retourne le JSon parsé
 * 
 * @return array
 */
function getJSon(){
  return json_decode(file_get_contents(URL_BDD));
}

/**
 * Sauvegarde le JSon une fois modifié
 * 
 * @param array $json
 */
function saveJSon($sjon){
  $bdd = fopen(URL_BDD, "w+");
  fwrite($bdd, json_encode($json));
  fclose($bdd);
}
 
/**
 * Retourne la liste des sliders de la bdd
 * 
 * @return array $return
 */
function findAllSliders(){
  $json = getJSon();
  $return = array();
  foreach($json->sliders as $slider){
    $return = new stdClass();
    $return->id = $slider->id;
    $return->titre = $slider->titre;
    $returns[] = $return;
  }
  return $returns;
}

/**
 * Retourne les slides d'un slider donné
 * 
 * @param int $id Identifiant du slider
 * @return stdClass $slider
 */
function findSliderById($id){
  $json = getJSon();
  foreach($json->sliders as $slider){
    if($slider->id == $id){
      $returns = new stdClass();
      $returns->id = $slider->id;
      $returns->titre = $slider->titre;
      $returns->slides = array();
      foreach($slider->slides as $slide){
        $return = new stdClass();
        $return->id = $slide->id;
        $return->titre = $slide->titre;
        $return->description = $slide->description;
        $return->nom_fichier = "Saga_".($id)."_".($slide->id);
        $returns->slides[] = $return;
      }
      return $returns;
    }
  }
}

/**
 * Retourne le slide correspondant à l'id fourni
 * 
 * @param int $id Identifiant du slide
 * @return stdClass $slide
 */
function findSlideById($id){
  $json = getJSon();
  foreach($json->sliders as $slider){
    foreach($slider->slides as $slide){
      if($slide->id = $id){
        $return = new stdClass();
        $return->id_slider = $slider->id;
        $return->id = $slide->id;
        $return->titre = $slide->titre;
        $return->description = $slide->description;
        $return->nom_fichier = "Saga_".($id)."_".($slide->id);
        return $return;
      }
    }
  }
}

/**
 * Ajoute le slide passé (ou le modifie si un id est déja fourni)
 * 
 * @param stdClass $slide
 */
function addSlide($slide){
  $json = getJSon();
  $i = 0;
  foreach($json->sliders as $slider){
    if($slider->id == $slide->id_slider){
      unset($slide->id_slider);
      
      if(isset($slide->id)){
        $j = 0;
        foreach($slider->slides as $s){
          if($s->id == $slide->id){
            $json->sliders[$i]->slides[$j] = $slide;
            break;
          }
          $j++;
        }
      }else{
        $ids = array();
        foreach($slider->slides as $s){
          $ids[] = $s->id;
        }
        $slide->id = max($ids) + 1;
        
        $json->sliders[$i]->slides[] = $slide;
      }
      
      saveJSon($json);
      break;
    }
    $i++;
  }
}