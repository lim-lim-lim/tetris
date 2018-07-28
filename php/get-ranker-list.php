<?php
    $db_host = "localhost";
    $db_user = "limlimlimlim";
    $db_password = "limhan03121020";
    $db_name = "limlimlimlim";
    $conn = mysqli_connect( $db_host, $db_user, $db_password, $db_name );
    $max_length = 100;

	if (mysqli_connect_errno($conn)) {
	  echo "fail" . mysqli_connect_error();
	} else {
	  	$sql = "SELECT * FROM tetris_rank ORDER BY score DESC, date DESC LIMIT 0, ".$max_length;
	  	$result = mysqli_query( $conn, $sql );
        $rows = array();
        for( $count=0 ; $count < $max_length ; $count++ ){
            $data = mysqli_fetch_array( $result );
            if( !$data ){
                $data = array();
                $data[ 'NAME' ] = 'NO DATA';
            }
            $data[ 'RANK' ] = $count+1;
            $rows[] = $data;
        }
		echo json_encode($rows);
	}
	mysqli_close( $conn );
?>