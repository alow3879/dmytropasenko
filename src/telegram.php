<?php
$email = $_POST['user_email'];
$name = $_POST['user_name'];
$message = $_POST['user_message'];
$token = "1097578763:AAHJKyD0pC0MusEONkZQW1p21y2BvbNqj9I";
$chat_id = "-447994505";
$arr = array(
  'Name: ' => $name,
  'Email: ' => $email,
  'Message: ' => $message
);

foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  header('Location: index.html');
} else {
  echo "Error";
}
?>