<?php 
require "twitteroauth/autoload.php";
use Abraham\TwitterOAuth\TwitterOAuth;
// .htaccess is a lie
// define('CONSUMER_KEY', getenv('HTTP_CONSUMER_KEY'));
// define('CONSUMER_SECRET', getenv('HTTP_CONSUMER_SECRET'));
// define('oauth_token', getenv('HTTP_oauth_token'));
// define('oauth_token_secret', getenv('HTTP_oauth_token_secret'));
define('CONSUMER_KEY', '7isiqO8ydWSqk7zdFOWhAw0c9');
define('CONSUMER_SECRET', 'UeuYzrRMrWiCrAp50rfoeWcBLklNIovyJ4lgGgPhSrAlxbZ7rD');
define('oauth_token', '867177052151173121-dYrLWqT07fGN9xBZ9JnLvSMGJho4Ttv');
define('oauth_token_secret', 'y3vYovshgbApXiyjU6ovsg0vn53thFBD4q16oY9LS9mfO');
// define('OAUTH_CALLBACK', 'http://localhost/RTZremote/callback.php');

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, oauth_token, oauth_token_secret);
$me = $connection->get("account/verify_credentials");

// //Below's for users registration/auth
// $request_token = $connection->oauth('oauth/request_token', array('oauth_callback' => OAUTH_CALLBACK));
// /**
// Storing the request tokens into SESSION variables
// */
// $_SESSION['oauth_token'] = $request_token['oauth_token'];
// $_SESSION['oauth_token_secret'] = $request_token['oauth_token_secret'];

// /**
// Request authorize URL - generated using the token
// */
// $url = $connection->url('oauth/authorize', array('oauth_token' => $request_token['oauth_token']));

// //Setup a button/trigger to navigate to $url
