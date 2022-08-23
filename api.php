<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    $_DATA = ($_SERVER["REQUEST_METHOD"] == "POST") 
            ? json_decode(file_get_contents("php://input"), true)
            : (array) ["B" => [], "A" => [], "logicos" => ""];
    extract($_DATA);

    $mensaje = match(!empty($vista)){
        true => match($logicos){
            "and" => ["res" => ($A && $B) ? "1" : "0", "A" => ($A) ? "1" : "0", "B"=> ($B) ? "1" : "0"],
            "or" => ["res" => ($A || $B) ? "1": "0", "A"=> ($A) ? "1" : "0", "B"=> ($B) ? "1" : "0"],
            "not" => ["res" => [(!$A) ? "1" : "0", (!$B) ? "1" : "0"], "A"=> ($A) ? "1" : "0", "B"=> ($B) ? "1" : "0"]
        },
        default => match($logicos){
            "and" => ["res" => $A && $B, "A"=> ($A) ? "V" : "F", "B"=> ($B) ? "V" : "F"],
            "or" => ["res" => $A || $B, "A"=> ($A) ? "V" : "F", "B"=> ($B) ? "V" : "F"],
            "not" => ["res"=> [!$A, !$B] , "A"=> ($A) ? "V" : "F", "B"=> ($B) ? "V" : "F"]
        }
    };

    print_r(json_encode((object) [
        "Mensaje" => (string) "Actividad de operador de logicos",
        "Servidor" => $_SERVER["HTTP_HOST"],
        "Respuesta" => $mensaje
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE ));
?>
