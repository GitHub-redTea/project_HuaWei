<?php 
	header('content-type:text/html;charset="utf-8"');
	//1、链接数据库
	$con = mysql_connect('localhost', 'root', '123456');
	if(!$con){
		echo "error";
		exit;
	}else{
		echo "success";
	}
	
	/*传入用户输入的账号密码数据*/
	$uesrname = $_POST['uesrname'];
	$password = $_POST['password'];

	//2、选择操作的数据库
	mysql_select_db('accounthtml');
	//3、拼接sql语句
	$sql = 'SELECT * FROM account';
	//4、发送sql语句，执行返回结果
	$res = mysql_query($sql);
	echo '<pre>';
	
	//将返回的数据中的每一条记录获取出来
	while($row =  mysql_fetch_assoc($res)){
		//$row 就是返回的每一条记录 这是一个关联数组 类似于对象
		//echo "<tr><td>{$row['username']}</td><td>{$row['password']}</td><td>{$row['chinese']}</td><td>{$row['english']}</td><td>{$row['math']}</td></tr>";
		$row['username']==$uesrname   &&$row['password']==$password
		ruturn true;
	}


	//echo "</table>";
 ?>