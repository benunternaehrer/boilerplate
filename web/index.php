<?php

// comment next 3 lines for hiding errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


    use Symfony\Component\Yaml\Yaml;

    require_once __DIR__.'/../vendor/autoload.php';
    $loader = new Twig_Loader_Filesystem(__DIR__.'/../views');
    $twig = new Twig_Environment($loader, [
        //'cache' => 'cache'
        'debug' => true
    ]);

    $params = Yaml::parse(file_get_contents(__DIR__.'/../data/data.yml'));


    // URL HANDLING
    $url = isset($_GET['url']) ? $_GET['url'] : '';
    $url = rtrim($url, '/');
    $url = explode('/', $url);
    $file = __DIR__.'/../views/templates/' . $url[0] . '.html.twig'; // VARIABLE FOR DYNAMIC ROUTING

    $params['page'] = $url[0];

    switch (true) {

        // HOME
        case (empty($url[0])):
            echo $twig->render('templates/home.html.twig', $params);
            break;

        case (file_exists($file)):
            echo $twig->render('templates/'.$url[0].'.html.twig', $params);
            break;

        default:
            echo $twig->render('templates/404.html.twig', $params);
            break;
        }
