<?php 

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$q = 'trump';
$q1 = 'taxes';
$language = 'pt';
$apiKey = '85a3559ed4e74a6c8b81b07f031dd44d';

$url = 'https://newsapi.org/v2/everything?'
        . "q=" . $q
        . "&q=" . $q1
        . "&language=" . $language
        . "&apiKey=" . $apiKey;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'User-Agent: DominioniBot/1.0 (+http://localhost:8000)'
]);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Erro de exibição: ' . curl_errno($ch);
} else {
    $data = json_decode($response, true);

    $noticias = array_map(function ($item) {
        return [
            'titulo' => $item['title'],
            'fonte' => $item['source'],
            'autor' =>  $item['author'],
            'conteudo' => $item['description'],
            'imagem' => $item['urlToImage'],
            'publicado' => $item['publishedAt']
        ];
    }, $data['articles']);
    // echo '<pre>';
    // print_r($data);
    // echo '</pre>';
    echo json_encode($noticias, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
};

curl_close($ch);
?>