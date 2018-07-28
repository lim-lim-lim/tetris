<?php
    $db_host = "localhost";
    $db_user = "limlimlimlim";
    $db_password = "limhan03121020";
    $db_name = "limlimlimlim";
    $conn = mysqli_connect( $db_host, $db_user, $db_password, $db_name );

    $name = $_POST[ 'name' ];
    $score = $_POST[ 'score' ];

    if (mysqli_connect_errno($conn)) {
        echo "fail" . mysqli_connect_error();
    } else {
        $sql = "INSERT INTO tetris_rank ( NAME, SCORE, DATE ) VALUES ( '$name', '$score' , now() )";
        mysqli_query( $conn, $sql );
        $sql = "SELECT count(*) as count FROM tetris_rank WHERE score > '$score'";
        $result = mysqli_query( $conn, $sql );
        echo mysqli_fetch_assoc( $result )[ 'count' ] + 1;
    }
    mysqli_close( $conn );
?>