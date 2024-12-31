<?php
$connect = mysqli_connect("localhost", "root", "", "pangcuy");

// function kirim data ke halaman databarangmasuk
function queryKeranjang($query)
{
    global $connect;
    // ambil data tabel barang masuk
    $result = mysqli_query($connect, $query);
    $rows = [];
    // looping semua data object barang masuk
    while ($row = mysqli_fetch_assoc($result)) {
        // masukan data ke variabel rows
        $rows[] = $row;
        // $rows . array_push($row);
    }
    // kembalikan array
    return $rows;
}
