<?php
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    $status = array();
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        $status['kode']=1;
        $status['deskripsi']='upload berhasil';
    } else {
        $status['kode']=0;
        $status['deskripsi']='upload TIDAK berhasil';
    }
    echo json_encode($status);
?>