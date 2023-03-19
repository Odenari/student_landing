<?php 

$name = $_POST['userName'];
$phone = $_POST['phoneNumber'];
$email = $_POST['userEmail'];

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '19TestMailBox44@gmail.com';                 // Наш логин
$mail->Password = 'jaaazzzqdpfnorwd';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to
 
$mail->setFrom('19TestMailBox44@gmail.com', 'Pulse');   // От кого письмо 
$mail->addAddress('odenari44@gmail.com');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные  пользователя';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $userName . ' <br>
	Номер телефона: ' . $phoneNumber . '<br>
	E-mail: ' . $userEmail . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>