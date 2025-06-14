<?php
header('Content-Type: application/json; charset=utf8');

$koneksi = mysqli_connect("localhost", "root", "", "siakad");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM mahasiswa";
    $query = mysqli_query($koneksi, $sql);
    $array_data = array();
    while ($data = mysqli_fetch_assoc($query)) {
        $array_data[] = $data;
    }

    echo json_encode($array_data);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama = $_POST['nama'];
    $alamat = $_POST['alamat'];
    $jurusan = $_POST['jurusan'];
    $sql = "INSERT INTO mahasiswa (nama, alamat, jurusan) 
    VALUES ('$nama', '$alamat', '$jurusan')";
    $cek = mysqli_query($koneksi, $sql);

    if ($cek) {
        $data = [
            'status' => "berhasil" 
        ];
        echo json_encode([$data]);
    } else {
        $data = [
            'status' => "gagal" 
        ];
        echo json_encode([$data]);
    }

} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') { 
    $nim = $_GET['nim'];
    $sql = "DELETE FROM mahasiswa WHERE nim = '$nim'";
    $cek = mysqli_query($koneksi, $sql);

    if ($cek) {
        $data = [
            'status' => "berhasil" 
        ];
        echo json_encode([$data]);
    } else {
        $data = [
            'status' => "gagal" 
        ];
        echo json_encode([$data]);
    }

} else if ($_SERVER['REQUEST_METHOD'] === 'PUT') { 
    $nim = $_GET['nim'];
    $nama = $_GET['nama'];
    $alamat = $_GET['alamat'];
    $jurusan = $_GET['jurusan'];

    $sql = "UPDATE mahasiswa SET nama='$nama', alamat='$alamat', jurusan='$jurusan' WHERE nim='$nim'";

    $cek = mysqli_query($koneksi, $sql);
    
    if ($cek) {
        $data = [
            'status' => "berhasil" 
        ];
        echo json_encode([$data]);
    } else {
        $data = [
            'status' => "gagal" 
        ];
        echo json_encode([$data]);
    }
}
?>