<?php
/*

🎯 Objetivo:
Criar um arquivo PHP que:
Receba uma cidade por parâmetro (ex: ?city=São Paulo);
Faça uma requisição para a API do open-meteo.com;
Retorne um JSON com os dados relevantes do clima.
php -S localhost:8000 -t backend

*/
// Captura de parâmetros em php geralmente utiliza-se $_GET[']
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');



$latitude = $_GET['latitude'] ?? '-30.0105';
$longitude = $_GET['longitude'] ?? '-50.1522';

// Montar a Url da API.
$url = 'https://api.open-meteo.com/v1/forecast?'
 . 'latitude=' . $latitude
 . '&longitude=' . $longitude
 . '&daily=sunrise,sunset'
 . '&hourly=temperature_2m,relative_humidity_2m,rain,precipitation,wind_speed_10m'
 . '&timezone=America%2FSao_Paulo';

// 3. Iniciar e configura a cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Se der erro com SSL, pode temporariamente ignorar com:
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
// 4. Executar requesição 
$response = curl_exec($ch);

// 5. Verificar erro
if (curl_errno($ch)) {
    echo 'Erro na requisição: ' . curl_error($ch);
} else {
    // 6. Decodificar e exibir o resultado como JSON formato
    $data = json_decode($response, true);

    $previsaoArr = array();
    foreach ($data['hourly']['time'] as $i => $hora) {
        $temp = $data['hourly']['temperature_2m'][$i];
        $chuva = $data['hourly']['rain'][$i];
        if ($i > 23) break;
        array_push($previsaoArr, [
            'hora' => $hora,
            'temperatura' => $temp,
            'chuva' => $chuva,
        ]);

    };
    $luzSolar = array();
    foreach($data['daily']['time'] as $i => $hora) {
        $nasce = $data['daily']['sunrise'][$i];
        $por = $data['daily']['sunset'][$i];
        if ($i > 5) break;
        array_push($luzSolar, [
            'nasce' => $nasce,
             'por' => $por,
        ]);
    }

    $resultado = [
        'previsaotempo' => $previsaoArr,
        'movimentoSolar' => $luzSolar,
    ];
    echo json_encode($resultado, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}   
// 7. Fechar sessão cURL
curl_close($ch);

?>