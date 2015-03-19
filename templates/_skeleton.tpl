<!DOCTYPE html>
<html>
  <head>
    <title>{$titre}</title>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" type="text/css" href="css/main.css" />
    <link rel="stylesheet" type="text/css" href="css/{$action}.css" />
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
  </head>
  <body>
    <header>
      <h1>{$titre}</h1>
    </header>
    <article>{include file=$action|cat:'.tpl'}</article>
    <footer>
      
    </footer>
  </body>
</html>